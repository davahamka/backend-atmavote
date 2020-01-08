const express = require('express');
const passport = require('passport');
const CategoryModel = require('../models/category.model')
const NomineeModel = require('../models/nominee.model')
const UserModel = require('../models/user.model')

const router = express.Router();


router.get('/', (req, res) => {
  CategoryModel.find()
  .then(categories => {
    res.json({
      categories
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

router.put('/vote', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let {name,category}  = req.body
  // console.log(req.body.name);
  // console.log(typeof req.body.name)
  
  // Update User
  const oldUser = await UserModel.findOne({ _id: req.user._id })
  let checkUser = oldUser.vote.findIndex(item => item.category === category)
  
  // oldUser.vote[checkUser].category = category
  // console.log(req.user)
  // console.log(oldUser.vote[checkUser].category)
  
  // Update Nominee
  const nominee = await NomineeModel.findOne({ name, category })
  console.log(nominee)
  nominee.vote += 1;

switch(checkUser){
  case 0:
    UserModel.findOneAndUpdate({_id:req.user._id}, {$set:{"vote.0":{ name: name, category: category}}} , {multi:true,overwite:true}, function(err, effected, raw){
      if(err) console.log(err)
      console.log(effected);
      console.log(raw)
     
  });
  break;
  case 1:
    UserModel.findOneAndUpdate({_id:req.user._id}, {$set:{"vote.1":{ name: name, category: category}}} , {multi:true,overwite:true}, function(err, effected, raw){
      if(err) console.log(err)
      console.log(effected);
      console.log(raw)
 
  });
  break;
  case 2:
    UserModel.findOneAndUpdate({_id:req.user._id}, {$set:{"vote.2":{ name: name, category: category}}} , {multi:true,overwite:true}, function(err, effected, raw){
      if(err) console.log(err)
      console.log(effected);
      console.log(raw)
  
  });
  break;
  case 3:
    UserModel.findOneAndUpdate({_id:req.user._id}, {$set:{"vote.3":{ name: name, category: category}}} , {multi:true,overwite:true}, function(err, effected, raw){
      if(err) console.log(err)
      console.log(effected);
      console.log(raw)
      
  });
  break;
      default:console.log("Bruh")
}

   

  //   await oldUser.save().catch(err =>{
  //   console.log(err)
  // })
  // console.log(oldUser)

  await nominee.save();


  res.json({
    message: 'Vote Successful',
    user:oldUser,
    nominee
  })
})

module.exports = router;