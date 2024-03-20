const express = require('express');
const { Blog, User } = require('../models');
const router = express.Router();


// Get all posts for homepage

router.get('/', async (req, res) => {
    try {
        const getPosts = await Post.findAll({
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

// Show dashboard when user logs in 

router.get('/dashboard', async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const getUser = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        // serialize the data

        const user = getUser.get({ plain: true });

        res.render('dashboard', {
            user,
            blogpost,
            loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        res.status(500).json(err);
    }
}
);

// Show login page
router.get ('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

module.exports = router;