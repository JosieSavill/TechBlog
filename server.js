const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');



// import the Post and User models
const { Post, User } = require('./models');



// routes added 
const postRoutes = require('./controllers/postroutes');
const homeRoutes = require('./controllers/homeroutes');
const userRoutes = require('./controllers/userRoutes'); 
const dashboardRoutes = require('./controllers/dashboardRoutes');


// added sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
const hbs = exphbs.create({
  helpers
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))


// added the postRoutes to the app

app.use(postRoutes);
app.use('/', homeRoutes);
app.use('/', userRoutes);
app.use('/', dashboardRoutes);

// added a middleware to attach the Post and User mdels to the request object
app.use(async (req, res, next) => {
  req.models = {
    Post,
    User,
  };

  next();

});





app.listen(PORT, ()=> {

  console.log(`app listening on http://localhost:${PORT}`)
  sequelize.sync({ force: false })

});



