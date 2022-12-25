const {Schema,model} = require('mongoose')

const schema = new Schema({
  title: String,
  price: Number,
  description: String,
  images: [String],
  category:{type:Schema.Types.ObjectId,ref:'Category'},
},{
  timestamps:true
})

module.exports = model('Product',schema)
