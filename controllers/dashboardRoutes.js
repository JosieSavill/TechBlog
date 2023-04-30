const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const withAuth= require('../utils/auth');



// Render dashboard page with blog posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {

        const user = await User.findByPk(req.user.id, {
            include: [{ model: Post }],
        });

        const posts = user.Posts;
        res.render('dashboard', { posts });

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: 'Server Error' });

    }

});


// Create ew blog post
router.post('/dashboard', withAuth, async (req, res) => {

    try {

        const { title, body } = req.body;
        const post = await Post.create({

            title,
            body,
            userId: req.user.id,

        });

        res.redirect('/dashboard');

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: 'Server Error' });

    }
});


// Update existing blog post
router.put('/dashboard/:id', withAuth, async (req, res) => {

    try {

        const { title, body } = req.body;
        const post = await Post.findByPk(req.params.id);
        if (!post) {

            return res.status(404).json({ error: 'Post not found' });

        }

        if (post.userId !== req.user.id) {

            return res.status(403).json({ error: 'Unauthorized'});

        }

        await post.update({ title, body });
        res.json({ success: true });

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }

});


// Delete existing blog post
router.delete('/dashboard/:id', withAuth, async (req, res) => {

    try {

        const post = await Post.findByPk(req.params.id);
        if (!post) {

            return res.status(404).json({ error: 'Post not found' });

        }

        if (post.userId !== req.user.id) {

            return res.status(403).json({ error: 'Unauthorized' });

        }

        await post.destroy();
        res.json({ success: true });

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: 'Server Error' });

    }
});


module.exports = router;

