const {StatusCodes} = require("http-status-codes")
const user = require("../models/User")
const BadRequestError = require("../errors/bad-request")
const register = async(req,res)=>{
    
    const User = await user.create({...req.body})
    res.status(StatusCodes.CREATED).json({User})
}
const login=async(req,res)=>{
    res.status(200).send("login")
}

module.exports = {register,login}