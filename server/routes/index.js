const express = require('express')
const router = express.Router({mergeParams:true})

router.use('/auth', require('./authRouter'))
router.use('/category', require('./categoryRouter'))
router.use('/product', require('./productsRouter'))
router.use('/user', require('./userRouter'))
router.use('/comments', require('./commentsRouter'))

module.exports = router


