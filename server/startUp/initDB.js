const categoryMock = require('../mock/categoryMock.json')
const Category = require('../models/Category')
const User = require('../models/User')
const usersMock = require('../mock/userMock.json')
const Product = require('../models/Product')
const productMock = require('../mock/productMock.json')
const chalk = require('chalk')

module.exports = async ()=>{
  const categorys =  await Category.find()
  if(categorys.length !== categoryMock.length){
    await createInitialEntity(Category,categoryMock)
  }
}
// module.exports = async ()=>{
//   const users =  await User.find()
//   if(users.length !== usersMock.length){
//     await createInitialEntity(User,usersMock)
//   }
// }
module.exports = async ()=>{
  const products =  await Product.find()
  if(products.length !== productMock.length){
    await createInitialEntity(Product,productMock)
  }
}

async function createInitialEntity(Model,data){
  await Model.collection.drop()
  return Promise.all(
    data.map(async item => {
      try{
        delete item.id
        const newItem = new Model(item)
        await newItem.save()
        console.log(chalk.green("data has been Initialized"))
        return newItem
      }catch (e) {
        console.log(chalk.red('ERROR IS', e))
        return e.message
      }
    })
  )
}
