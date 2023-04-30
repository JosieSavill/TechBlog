const express = require('express');
const router = express.Router();
const {Post, User} = require('../models')

router.get('/', async (req, res)=>{


  //get data post = getDATa 
  console.log("did i get user?",req.session.user)
  try{
      const result = await Post.findAll({
      
       
        raw: true
  
      });

      let newPostList = [];
      result.map(p=>{
        //user_id
        User.findOne({
          where: {id: p.user_id},
          raw: true
        }).then((user)=>{

         
          p.user = user;
          newPostList.push(p);
        })
       

      })

   

      console.log("i got post data", result)
      res.render('homepage.handlebars', {
        posts: result,
        user: req.session.user
      })


  } catch(err){
    console.log(err)
  }

  console.log("i am here")
 
} )



module.exports = router;