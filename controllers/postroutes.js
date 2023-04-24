const router = require('express').Router();

router.get('/userposts', (req, res)=> {
    console.log("hell form posts routes")
    res.render('allpost.handlebars')

});

module.exports = router;