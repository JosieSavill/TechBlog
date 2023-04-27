const express = require('express');
const router = express.Router();

// renders the login page whe use clicks the "login" link
router.get('/views/login.handlebars', (req, res) => {
  res.render('login', { title: 'Login' });
});



module.exports = router;