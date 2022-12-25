const express = require('express')
const auth = require('../middleware/auth.middlware')
const Comment = require('../models/Comment')
const router = express.Router({mergeParams:true})

router.route('/')
  .get(auth, async (req,res) =>{
    try {
      const {orderBy, equalTo} = req.query
      const list = await Comment.find({[orderBy]:equalTo})
      res.send(list)
    } catch (e) {
      res.status(500).json({
        massage:'Server error! Try letter'
      })
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id
      })
      res.status(201).send(newComment)
    } catch (e) {
      res.status(500).json({
        message: 'Server error! Try letter'
      })
    }
  })

router.delete('/:commentId', auth, async (req,res) => {
  try {
    const {commentId} = req.params
    const removeComment = await Comment.findById(commentId)
    if(removeComment.userId.toString()===req.user._id){
      await removeComment.remove()
      return res.send(null)
    } else {
      res.status(401).json({error:{massage:'Unauthorized'}})
    }
  } catch (e) {
    res.status(500).json({
      massage:'Server error! Try letter'
    })
  }
} )
module.exports = router

