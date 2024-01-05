const mongoose = require('mongoose');
const User = require('./model/userSchema');
const Blog = require('./model/blogSchema');
const Comment = require('./model/commentSchema');
const bcrypt = require("bcrypt");
const saltRounds = 10

const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error(err.message);
    }
}

function getRandomStringFromArray(stringArray) {

    // Generate a random index between 0 and the length of the array
    const randomIndex = Math.floor(Math.random() * stringArray.length);

    // Return the random string from the array
    return stringArray[randomIndex];
}

const myArray = ["apple", "banana", "cherry", "date"];

async function populateData() {
    try {
        await mongoose.connect('mongodb://localhost:27017/adt', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected to mongodb");
        console.log("Populating the Data");

        const newPassword = await hashPassword('password');

        for (let i = 1; i < +100; i++) {
            // sample users
            const user1 = await User.create({
                firstName: `Adam-${i}`,
                lastName: `Lee-${i}`,
                email: `john@example.com`,
                password: newPassword,
                mobile: 8375022778,
                dob: '1990-05-24'
            });

            getRandomStringFromArray(myArray);

            // sample blog posts
            const blog = await Blog.create({
                title: `Sample Blog Title by Adam-${i} Lee-${i}`,
                content: `Content of the blog given added by Adam-${i} Lee-${i}`,
                author: user1._id,
                authorName: `Adam-${i} Lee-${i}`,
                tags: [getRandomStringFromArray(myArray), getRandomStringFromArray(myArray)],
                categories: [getRandomStringFromArray(myArray), getRandomStringFromArray(myArray)]
            });

            // sample comments
            const comment1 = await Comment.create({
                text: `Great blog by Adam-${i} Lee-${i}`,
                blogID: blog._id,
                commenterName: `Adam-${i} Lee-${i}`
            });
        }

        console.log("Date Populated");
        mongoose.disconnect();
    } catch (error) {
        console.log(`error while connecting mongodb : ${error}`);
    }
}

populateData();