const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const saltRounds = 10;

const ValidateEmail = (mail) => {
    // Use a regular expression to validate email.
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
};

const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error(error.message);
        throw error; // Rethrow the error for handling in the route handler.
    }
};

const compareHashPassword = async (password, hashPassword) => {
    try {
        const isValid = await bcrypt.compare(password, hashPassword);
        return isValid;
    } catch (error) {
        console.error(error.message);
        throw error; // Rethrow the error for handling in the route handler.
    }
};

router.post('/register', async (req, res) => {
    try {
        const { password, confirmPassword, firstName, lastName, email, mobile, DOB } = req.body;

        if (!email || !ValidateEmail(email)) {
            return res.status(400).json({ message: 'Invalid Email Address' });
        }

        if (!password || !confirmPassword || password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        if (!mobile || !Number.isInteger(mobile)) {
            return res.status(400).json({ message: 'Invalid Mobile Number' });
        }

        if (!firstName || !lastName) {
            return res.status(400).json({ message: 'First Name or Last Name missing' });
        }

        if (new Date(DOB) == 'Invalid Date') {
            return res.status(400).json({ message: 'Invalid Date of Birth' });
        }

        // const existingUser = await User.findOne({ email }).exec();
        // if (existingUser) {
        //     return res.status(409).json({ message: 'User Already Exists' });
        // }

        const newPassword = await hashPassword(password);
        const newUserDetails = {
            firstName,
            lastName,
            mobile,
            password: newPassword,
            email,
            dob: DOB,
        };

        const user = await User.create(newUserDetails);
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Unable to register' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { password, email } = req.body;

        if (!email) {
            return res.status(401).json({ message: 'Email missing' });
        }

        if (!password) {
            return res.status(401).json({ message: 'Password missing' });
        }

        if (!ValidateEmail(email)) {
            return res.status(401).json({ message: 'Invalid Email Address' });
        }

        const existingUser = await User.findOne({ email }).exec();
        if (!existingUser) {
            return res.status(401).json({ message: 'User does not exist' });
        }

        const isValid = await compareHashPassword(password, existingUser.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Wrong Password' });
        }

        const user = {
            email,
            password,
        };

        jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error(err.message);
                res.status(401).json({ message: 'Unable to Login' });
            } else {
                res.status(200).json({ token });
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ message: 'Unable to Login' });
    }
});

module.exports = router;
