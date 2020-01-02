const express = require('express');
const passport = require('passport');
const CategoryModel = require('../models/category.model')
const NomineeModel = require('../models/nominee.model')
const UserModel = require('../models/user.model')

const router = express.Router();

router.get('/', (req, res) => {
  CategoryModel.find().then(categories => {
    res.json({
      categories
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

router.post('/vote', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { name, category } = req.body
  
  // Update User
  const oldUser = await UserModel.findOne({ _id: req.user._id })
  let checkUser = oldUser.vote.findIndex(item => item.category === category)
  oldUser.vote[checkUser] = { name, category }

  // Update Nominee
  const nominee = await NomineeModel.findOne({ name, category })
  nominee.vote += 1

  console.log(oldUser)

  await oldUser.save()
  await nominee.save()

  res.json({
    message: 'Vote Successful',
    user: oldUser,
    nominee
  })
})

module.exports = router;