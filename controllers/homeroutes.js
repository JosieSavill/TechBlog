const express = require('express');
const router = express.Router();
const {Post, User} = require('../models')

router.get('/', async (req, res)=>{


  //get data post = getDATa 
  console.log("did i get user?", req.session.user_id)
  try{
      const result = await Post.findAll({
        include: {model: User}
      });

      const plainBuild = result.map(x => x.get({plain: true}))

      if(req.session.user_id === undefined){
        res.render('homepage.handlebars', {
          posts: plainBuild,
          user: false
         
        })

      }  else {
        res.render('homepage.handlebars', {
          posts: plainBuild,
          user: req.session.user_id
         
        })
      }
      
     


  } catch(err){
    console.log(err)
  }

  console.log("i am here")
 
} )



module.exports = router;