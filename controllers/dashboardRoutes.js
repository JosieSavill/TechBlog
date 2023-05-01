const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const withAuth= require('../utils/auth');



// Render dashboard page with blog posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const currentUser = await User.findOne({
            where: {id: req.session.user_id},
            raw: true
        });

        const result = await Post.findAll({
            include: {model: User}
          });
    
          const plainBuild = result.map(x => x.get({plain: true}))
    
         
         
          console.log("check",currentUser)

        res.render('dashboard', { user: currentUser,
            posts: plainBuild });

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }

});


// Create new blog post
router.post('/views/dashboard', withAuth, async (req, res) => {

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
        const post = await Post.findById(req.params.id);
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

        const post = await Post.findById(req.params.id);
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

