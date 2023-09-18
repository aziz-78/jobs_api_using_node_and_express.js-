const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const schema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minlength:3,
        maxlength:50
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email',
        ],
        unique: true,
      },
      password:{
        type:String,
        required :[true,'Password field cannot be empty'],
        minlength:6
      }
})
schema.pre('save', async function(){
 const salt  = await bcrypt.genSalt(10)
 this.password = await bcrypt.hash(this.password ,salt )
})
schema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.jwt_secretKey ,
    {
      expiresIn: process.env.jwt_exp,
    }
  )
}
schema.methods.comparePassword=async function(candidatePassword){
  const ismatch = bcrypt.compare(candidatePassword,this.password)
  return ismatch 
 
}
module.exports= mongoose.model('User',schema)