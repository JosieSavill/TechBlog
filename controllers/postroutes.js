const router = require('express').Router();

router.get('/userposts', (req, res)=> {
    console.log("hello from posts routes")
    res.render('allpost.handlebars')

});



module.exports = router;