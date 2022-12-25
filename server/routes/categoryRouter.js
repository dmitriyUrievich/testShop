const express = require('express')
Category = require('../models/Category')
const router = express.Router({mergeParams:true})

router.get('/', async (req, res) => {
    try {
      const list = await Category.find()
      res.status(200).send(list)
    } catch (e) {
      res.status(500).json({message: 'Server error'})
    }
})




module.exports = router

