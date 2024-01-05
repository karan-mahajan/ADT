const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./model/userSchema');
const Recommendation = require('./model/userRecommendation');
const { default: axios } = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());  // Enable CORS for all routes
app.use(express.json());

const connect = async () => {
    try {
        mongoose.connect('mongodb+srv://karanmahajan:karan@cluster0.h6yc9uf.mongodb.net/adt', {
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

app.get('/', (req, res) => {
    res.send("Welcome to ADT Assignment");
})


app.post('/addrecommendation', verifyToken, async (req, res) => {
    try {
        const { articlesId } = req.body;
        const { user } = req.userData;
        const userDetails = await User.findOne({ email: user.email }).exec();
        await Recommendation.deleteMany({ user: userDetails.id }).exec();
        const promises = [];
        articlesId.map(async (val) => {
            const axiosPromise = await axios.get(`http://127.0.0.1:8000/author/${val}`);
            const data = {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                user: user.id,
                recommendation: val,
                author: axiosPromise.data.author_name
            }
            const recommendationPromise = Recommendation.create(data);
            promises.push(recommendationPromise);
        })
        await Promise.all(promises);
        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to find the user' });
    }
})

app.put('/updaterecommendation', verifyToken, async (req, res) => {
    try {
        const { articlesId } = req.body;
        const { user } = req.userData;
        const userDetails = await User.findOne({ email: user.email }).exec();
        // const userRecomm = await Recommendation.findOne({ user: userDetails._id }).exec();
        await Recommendation.deleteMany({ user: userDetails.id }).exec();
        const promises = [];
        articlesId.map(async (val) => {
            const axiosPromise = await axios.get(`http://127.0.0.1:8000/author/${val}`);
            const data = {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                user: userDetails._id,
                recommendation: val,
                author: axiosPromise.data.author_name
            }
            const recommendationPromise = Recommendation.create(data);
            promises.push(recommendationPromise);
        })

        await Promise.all(promises);
        return res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while updating the recommendation' });
    }
})

app.get('/recommendation', verifyToken, async (req, res) => {
    try {
        const { user } = req.userData;
        const userDetails = await User.findOne({ email: user.email }).exec();
        const userRecomm = await Recommendation.find({ user: userDetails._id });
        if (userRecomm.length == 0) {
            return res.status(200).json([]);
        }
        const recomArray = userRecomm.map((det) => {
            return det.recommendation
        })
        res.status(200).json(recomArray);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while finding the recommendation' });
    }
})


mongoose.connection.once('open', () => {
    app.listen(8000, () => {
        console.log("Server running on port 8000");
    });
})