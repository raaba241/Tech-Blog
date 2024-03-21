const express = require('express');
const router = express.Router();
const { Blog, User } = require('../../models');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Blog.findAll();
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new post
router.post('/post', async (req, res) => {
    try {
        const postData = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.body.user_id, 
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});




// Update a post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.userId,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;