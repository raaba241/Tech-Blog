const express = require('express');
const { Blog, User } = require('../models');
const router = express.Router();
const sequelize = require('../connections/connection');


// Get all posts for homepage

router.get('/', async (req, res) => {
    try {
        const getPosts = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['userName'],
                },
            ],
        });

        const posts = getPosts.map((post) => post.get({ plain: true }));
        
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,

        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/postSubmit', async (req, res) => {
    res.render('create');
});

// Show dashboard when user logs in 

router.get('/dashboard', async (req, res) => {
    try {
      // retrieve the logged in user based on the session ID, excluding pw
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });
  
      //serialize the user data
      const user = userData.get({ plain: true });
  
      // render the dashboard template, passing the user data
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get ('/login', (req, res) => {

    req.session.logginedIn = true;

    if (true) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

module.exports = router;