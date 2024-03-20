const express = require('express');
const { Post, User } = require('../models');
const router = express.Router();


// Get all posts for homepage

router.get('/', async (req, res) => {
    try{
        const getPosts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

