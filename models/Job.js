const mongoose = require("mongoose")
const jobs = mongoose.Schema(
    {
        company:{
            type:String,
            maxlength:50,
            required:[true,"Please provide company name"]
        },
        position:{
            type: String ,
            maxlength:100,
            required : [ true ," Please Provide Position "]
        },
        status:{
            type:String,
            enum:["interview","declined","pending"],
            default:"pending"
        },
        createdBy:{
           type:mongoose.Types.ObjectId,
           ref:'User',
           required:[true,"Please provide user"]

        },
    
    },
    {timestamps:true}

)
module.exports = mongoose.model('Job',jobs)