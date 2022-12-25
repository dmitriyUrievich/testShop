const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const initDatabase = require('./startUp/initDB')
const routes = require('./routes')
const PORT = config.get('port') ?? 8080
const app = express()
const path = require("path");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api', routes)

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

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));

  const indexPath = path.join(__dirname, "client", "index.html");
  app.get("*", async (req, res) => {
    res.sendFile(indexPath);
  });
}
