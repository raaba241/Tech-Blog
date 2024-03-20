const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Assuming your Sequelize User model
const withAuth = require('../utils/auth'); // Middleware to verify if the user is logged in


const router = express.Router();

// allow users to login to their account
router.get('/login', async (req, res) => {
    try{
        const userInfo = await User.findOne({ where: { email: req.body.email } });
        
        if (!userInfo){
            res.status(400).json({ message: 'please enter a valid email or password'})
            return;
        }

        const userPassword = await bcrypt.compare(req.body.password, userInfo.password);

        if (!userPassword){
            res.status(400).json({ message: 'please enter a valid email or password'})
            return;
        }

        req.session.save(() => {
            req.session.userId = userInfo.id;
            req.session.loggedIn = true;

            res.json({ user: userInfo, message: 'You are now logged in!'});
        });
    } catch (err) {
        res.status(400).json(err);
    }   
});