const express = require('express');
const router = express.Router();
const { User } = require('../models');



// renders the login page whe use clicks the "login" link
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
  });
  

router.post('/login', async (req, res) => {
    console.log("did i get data?", req.body)
    try {
        const { username, password } = req.body;
        
        // gind the user by username
        const user = await User.findOne({
            where: { username }

        });


        // if the user is not found, send an error msg
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password'});

        }

        // set user ID in the session
        req.session.user_id = user.id;

        console.log({ message: 'Login successful!'});


        // send success msg
        res.redirect("/")
       
    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// renders the login page whe use clicks the "login" link
router.get('/signup', (req, res) => {
    res.render('signup');
  });
  

router.post('/signup', async (req, res) => {
    console.log("did i get data?", req.body);
    try {
 
        // find the user by username
        const user = await User.create({

            name: req.body.name,
            username: req.body.username,
            password: req.body.password

        });
 

        // set user ID in the session
        req.session.user_id = user.id;

        // send success msg
        //res.status(200).json({ message: 'Signup successful!' });
        res.redirect('/');
       
    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

});   

    router.post('/logout', (req, res) => {
        // destroy the user session and redirect to the homepage
        req.session.destroy(() => {
          res.redirect('/');
        });

});



// need to add logout route here

module.exports = router;


















// const router = require('express').Router();
// const { User } = require('../models');

// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// module.exports = router;
