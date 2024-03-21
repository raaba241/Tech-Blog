const express = require('express');
const router = express.Router();
const { User, Blog } = require('../../models');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get by id

router.get('/:id', async (req, res) => {


    try {
        const userData = await User.findOne({
            where: { id: req.params.id },
            exclude: ['password'],
            include: [{ model: Blog, attributes: ['id', 'title', 'content'] }, { model: Blog, attributes: ['title' ]}
        ]});

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(userData);

    } catch (err) {
        res.status(500).json(err)

    }
})
// router.get('/:id', async (req, res) => {
//     try{
//         const userData = await User.findByPk(req.params.id);
//         res.json(userData);

//     } catch (err) {
//         res.status(500).json(err);

//     }});




// User registration
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            req.session.password = userData.password;

            res.json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, userData.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'Login Successfull' });
        });


    } catch (err) {
        res.status(500).json(err);
    }
});

// User logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;