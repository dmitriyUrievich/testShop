const express = require('express')
User = require("../models/User");
const router = express.Router({mergeParams:true})

router.get('/', async  (req,res)=>{
  try {
    const list = await User.find()
    res.status(200).send(list)
  } catch (e) {
    res.status(500).json({
      massage:'Server error! Try letter'
    })
  }
})

module.exports = router

