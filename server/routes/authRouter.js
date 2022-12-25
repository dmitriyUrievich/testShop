const express = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const {generateUserData} = require('../utils/helpers')
const router = express.Router({mergeParams:true})
 const tokenService = require('../services/token.service')
const chalk = require("chalk");
// api/auth/signUp
// 1 get data from req (email, password ...res)
// 2 chek if users alredy exist
// 3 hash password
// 4 create User
//  generate tokens

router.post('/signUp', [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Min length must be 8 symbols').isLength({min:8}),
  async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({
        error:{
          message: 'Invalid data',
          code: 400,
          errors: errors.array()
        }
      })
    }

    const {email, password, name} = req.body
    const existingUser = await User.findOne({email})
    console.log(chalk.gray('++++++'))
    if(existingUser){
      return res.status(400).json({
        error: {
          message: 'Email exists!',
          code: 400,
        }
      })
    }
    console.log(chalk.gray('++++++',JSON.stringify(req.body)))
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      name:name,
      ...generateUserData(),
      ...req.body,
      password: hashedPassword
      // email: email
      })
    const tokens = tokenService.generate({_id:newUser._id})
    // console.log(chalk.bgBlue(Object.keys(tokens)))
    await tokenService.save(newUser._id, tokens.refreshToken)
    // const localId = newUser._id
    res.status(201).send({
    tokens:{...tokens, userId:newUser._id}, user: newUser
  })
    console.log(chalk.blue('User created '))
  } catch (e) {
    res.status(500).json({
      massage:'Server error!!!! Try letter'
    })
  }
}])

// api/auth/signInWithPassword
// 1 validate data
// 2 find user
// 3 compare heshed password
// 4 generate tokens
// 5  return data
router.post('/signInWithPassword', [
  check('email', 'Incorrect email!').normalizeEmail().isEmail(),
  check('password', 'Enter password').exists(),
  async (req, res) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({
        errors:{
          message:'INVALID_DATA',
          code:400
        }})
    }
    const {email, password} = req.body
    const exsistingUser = await User.findOne({email})
    if(!exsistingUser) {
      return res.status(400).send({error:{
        message: 'Email not found',
        code: 400
        }})
    }
    const isPasswordEqual = await bcrypt.compare(password,exsistingUser.password)
    if(!isPasswordEqual){
      return res.status(400).send({error:{
          message: 'Invalid password',
          code: 400
        }})
    }

    const tokens = tokenService.generate({_id:exsistingUser._id})
    tokenService.save(exsistingUser._id, tokens.refreshToken)

    res.status(200).send({tokens:{...tokens, userId:exsistingUser._id}, user:exsistingUser})
  }catch (e) {
    res.status(500).json({
      massage:'Server error!!!! Try letter'
    })
  }
}])

// api/auth/signInWithPassword
// 1 validate data
// 2 find user
// 3 compare heshed password
// 4 generate tokens
// 5  return data

function isRokenInvalid (data,dbToken){
  return !data || !dbToken || data._id!==dbToken?.user?.toString()
}
router.post('/token', async (req, res) => {
  try {
  const {refresh_token: refreshToken} = req.body
  const data = await tokenService.validateRefresh(refreshToken)
  const dbToken = await tokenService.findToken(refreshToken)
  if(isRokenInvalid(data,dbToken)){
    return res.status(401).json({
      error: {
        message: 'Unauthorized'
      }})
  }
  const tokens = await tokenService.generate({_id:data._id})
  await tokenService.save(data._id, tokens.refreshToken)

  res.status(200).send({...tokens, userId:data._id})
  }catch (e) {
    res.status(500).json({
      massage:'Server error!! Try letter..'
    })
  }
})
module.exports = router

