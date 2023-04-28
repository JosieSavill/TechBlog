// user posts to blog

const router = require('express').Router();

router.get('/userposts', (req, res)=> {
    console.log("hello from posts routes")
    res.render('allpost.handlebars')

});


router.post("/post",  (req, res)=> {
    console.log("blog post form data received","req.body.???")

});




module.exports = router;











