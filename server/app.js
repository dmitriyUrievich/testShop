const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const initDatabase = require('./startUp/initDB')
const routes = require('./routes')
const PORT = config.get('port') ?? 8080
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api', routes)

// if(process.env.NODE_ENV === 'production'){
//   console.log('prod')
// } else {
//   console.log('dev')
// }
async function start () {
  try{
    mongoose.connection.once('open', ()=>{
      initDatabase()
    })
    await mongoose.connect(config.get('mongoUri'))
    app.listen(PORT,()=>{
      console.log(chalk.green(`Server has  benn started on ${PORT}` ))
    })
  }catch (e) {
    console.log(chalk.red(`Error === ${e.message}` ))
    process.exit(1)
  }
}

start()



