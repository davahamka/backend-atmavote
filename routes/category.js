const express = require('express');
const CategoryModel = require('../models/category.model')

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

module.exports = router;