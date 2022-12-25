const {Schema,model} = require('mongoose')

const schema = new Schema({
  content:{ type:String,required:true},
  // на чьей странице комментарий
  pageId: {type:Schema.Types.ObjectId, required:true, ref:'User'},
  //id кто оставил коммент
  userID: {type:Schema.Types.ObjectId, required:true, ref:'User'}
},{
  timestamps: {createdAt:'created_at'}
})

module.exports = model('Comment',schema)
