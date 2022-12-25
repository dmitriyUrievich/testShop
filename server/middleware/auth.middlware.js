const tokenService = require('../services/token.service')
const chalk = require("chalk")
module.exports = (req,res,next) => {
  if(req.method==='OPTIONS'){
    return next()
  }
  try{
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
      return res.status(401).json({error:{massage:'Unauthorized'}})
    }
    const data = tokenService.validateAccess(token)
    console.log(chalk.blue(data))
    req.product = data
    next()
  }catch (e) {
    res.status(500).json({
      massage:'Unauthorized...'
    })
  }
}
