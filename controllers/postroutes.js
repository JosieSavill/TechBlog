// login POST route


const router = require('express').Router();

router.get('/userposts', (req, res)=> {
    console.log("hello from posts routes")
    res.render('allpost.handlebars')

});



module.exports = router;











// const express = require('express');
// const router = express.Router();
// const { User } = require('../models');



// router.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
        
//         // gind the user by username
//         const user = await User.findOne({
//             where: { username }

//         });


//         // if the user is not found, send an error msg
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid username or password'});

//         }

//         // set user ID in the session
//         req.session.userId = user.id;

//         // send success msg
//         res.json({ message: 'Login successful!'});

//     }   catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });



// module.exports - router;