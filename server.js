const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const postRoutes = require('./controllers/postroutes')

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


app.get('/', async (req, res)=>{


  //get data post = getDATa -art 1

  console.log("i am here")
  res.render('homepage.handlebars', {
    posts: [] //post assignt the data to varaible for handlbars -art 2
  })
} )




app.use(postRoutes)

// each model needs a route

// 1. first 
// server.js get post DATA
// post.find()......

// give post to handlebars
// render{
//   post: post
// }

// 2. homepage.handlebars
//render it with the #each loop
// 






app.listen(PORT, ()=> {
  console.log(`app listening on http://localhost:${PORT}`)
  sequelize.sync({ force: false })
})



