// user posts to blog

const router = require('express').Router();
const { Post } = require('../models');

//GET route to display all blog posts
router.get('/posts', async (req, res)=> {

    try {

        const posts = await Post.findAll();
        res.render('allposts', { posts });
        console.log("hello from posts routes");

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

});


router.get('/post/:id', async (req, res)=> {

    try {

        const post = await Post.findOne({
            where: {id: req.params.id},
            raw: true
        });

        console.log("one post",post)
      
        res.render('onepost', { post });
 

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

});



router.get('/post/edit/:id', async (req, res)=> {

    try {

        const post = await Post.findOne({
            where: {id: req.params.id},
            raw: true
        });

        console.log("one post",post)
      
        res.render('editpost', { post });
 

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

});



router.get('/post/delete/:id', async (req, res)=> {

    try {

        const post = await Post.destroy({
            where: {id: req.params.id},
            raw: true
        });

       
      
        res.redirect('/')
 

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

});





router.post('/post/edit/', async (req, res) =>{

    try{

        const newPost = await Post.update({

            title: req.body.title,
            body: req.body.body,


        },{
            where: {id: req.body.post_id}
        });

     
        res.redirect('/');

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

});



// POST route to create a new blog post

router.post('/posts/create', async (req, res)=> {

    try{

        const newPost = await Post.create({

            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id

        });

        res.redirect('/');

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }
    

});




module.exports = router;











