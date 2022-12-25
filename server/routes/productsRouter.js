const express = require('express')
const router = express.Router({mergeParams:true})
const Product = require('../models/Product')
const auth = require('../middleware/auth.middlware')
const chalk = require('chalk')
const {check, validationResult} = require('express-validator')
router.get('/', async  (req,res)=>{
  try {
    const list = await Product.find()
    res.send(list)
  } catch (e) {
    res.status(500).json({
      massage:'Server error! Try letter'
    })
  }
})
router.delete('/del/:id', async (req, res)=>{
  console.log('----1')
  const {id} = req.params
  try {
    const removeedProduct = await Product.findById(id);
    await removeedProduct.remove();
    console.log('----2')
    res.send(null)
  } catch (e) {
    console.log('----3',e)
    res.status(500).json({
      massage:'Server error! Try letter'
    })
  }
})
router.post('/',
 async (req, res) => {
    try {
      const { newData } = req.body
      const newProduct = await Product.create(newData)
      console.log('_++++++++',chalk.bgGrey( JSON.stringify(newProduct)))
      res.status(201).send(newProduct)
      console.log(chalk.blue('CRETE PRODUCTTT'))
    } catch (e) {
      res.status(500).json({
        message: 'Server error! Try letter'
      })
    }
  })
router.patch('/:productId', async  (req,res)=>{
  const {newData, productId} = req.body
  try {
    if(productId){
      const updatedProduct = await Product.findByIdAndUpdate(productId, newData, {new: true})
      res.send(updatedProduct)
    } else {
      res.status(401).json({error:{massage:'Unauthorized'}})
    }
  } catch (e) {
    res.status(500).json({
      massage:'Server error! Try letter'
    })
  }
})



module.exports = router
