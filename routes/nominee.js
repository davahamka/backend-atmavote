const express = require('express');
const NomineeModel = require('../models/nominee.model')

const router = express.Router();

router.get('/', (req, res) => {
  NomineeModel.find().then(nominee => {
    res.json({
      nominee
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

module.exports = router;