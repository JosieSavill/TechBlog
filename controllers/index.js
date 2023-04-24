const express = require('express');
const { cloneDeep } = require('sequelize/types/utils');
const router = express.Router();

// Route handler for the home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Route handler for the about page
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

module.exports = router;

//handlebars
//you get the data first then you get the pagej, dont need api routes

//ajax you get the page first then you get ajax === fetch they are used with api the data