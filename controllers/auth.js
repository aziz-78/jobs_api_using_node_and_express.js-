const {StatusCodes} = require("http-status-codes")
const user = require("../models/User")
const BadRequestError = require("../errors/bad-request")
const UnauthenticatedError = require("../errors/unauthenticated")
const helmet = require("helmet")
require('dotenv').config()
const register = async(req,res)=>{
    
    const User = await user.create({...req.body})
    const token = User.createJWT()
    res.status(StatusCodes.CREATED).json({User:{name:User.name},token:token})
}
const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
      throw new BadRequestError("Please provide email and password to log in.")
    }
    const User = await user.findOne({email})
    if(!User){
      throw new UnauthenticatedError('Invalid Credentials')
    }
    const match = User.comparePassword(password)
    if(!match){
      throw new UnauthenticatedError('enter correct password')
    }
    // compare password
  const token = User.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: User.name }, token })
  }

module.exports = {register,login}