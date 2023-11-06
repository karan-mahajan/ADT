const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./model/userSchema');
const Blog = require('./model/blogSchema');
require('dotenv').config();

const app = express();

app.use(cors());  // Enable CORS for all routes
app.use(express.json());

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected to mongodb");
    } catch (error) {
        console.log(`error while connecting mongodb : ${error}`);
    }
}

connect();

// Routes

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.includes(' ') ? bearerHeader.split(' ') : [null, bearerHeader];
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                res.sendStatus(403).json({ message: "user not logged in" });
            } else {
                req.userData = data;
                next();
            }
        });
    } else {
        res.sendStatus(403).json({ message: "user not logged in" });
    }
};

app.use('/', userRoute);
app.use('/blog', verifyToken, blogRoute);

app.post('/getuser', verifyToken, async (req, res) => {
    try {
        const { userId } = req.body;
        const userDetails = await User.findOne({ _id: userId }).exec();
        res.status(200).json({
            fullName: `${userDetails?.firstName} ${userDetails?.lastName}`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to find the user' });
    }
})

app.get('/checkuser', verifyToken, async (req, res) => {
    try {
        const id = req.query.blogId;
        const blogDetails = await Blog.findOne({ _id: id }).exec();
        const userId = blogDetails.author;
        const userDetails = await User.findOne({ _id: userId }).exec();
        res.status(200).json({ email: userDetails.email });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to find the user details' });
    }
})

app.get('/', (req, res) => {
    res.send("Welcome to ADT Assignment");
})


mongoose.connection.once('open', () => {
    app.listen(8000, () => {
        console.log("Server running on port 8000");
    });
})