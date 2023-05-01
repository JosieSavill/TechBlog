// user posts to blog

const router = require('express').Router();
const { Post, User, Comment } = require('../models');

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

        const result = await Post.findOne({
            where: {id: req.params.id},
            include: [{model: User}, {model: Comment, include: {model: User}}]
    
        });
        const plainBuild = result.get({plain: true})

        console.log("catch", plainBuild)



        if(req.session.user_id === undefined){
            res.render('onepost', {
              post: plainBuild,
              user_id: false,
       
             
            })
    
          }  else {
            res.render('onepost', {
              post: plainBuild,
              user_id: req.session.user_id
             
            })
          }


      
 

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
      
        res.render('editpost', { post: post,
            user_id: req.session.user_id
        
        });
 

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

router.post('/posts', async (req, res)=> {

    try{

        const result = await Post.create({

            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id

        });

        res.redirect('/dashboard');

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }
    

});


router.post('/comments', async (req, res)=> {
    console.log("add comment")

    try{

        const result = await Comment.create({

            text: req.body.text,
            post_id: parseInt(req.body.post_id),
            user_id: parseInt(req.body.user_id)

        });

        res.redirect(`/post/${req.body.post_id}`);

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }
    

});






module.exports = router;











