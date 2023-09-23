const Job = require("../models/Job")
const {StatusCodes}= require("http-status-codes")
const bad_request = require("../errors/bad-request")
const not_found = require("../errors/not-found")
const getAllJob = async (req,res) =>{
   const jobs = await Job.find({createdBy:req.user.userId}).sort("createdAt")
   res.status(StatusCodes.OK).json({jobs, count: jobs.length})

}
const getJob = async(req,res) =>{
   const userId = req.user.userId
   const jobId = req.params.id
   const jobs = await Job.findOne({_id:jobId,createdBy:userId})
   if(!jobs){
    throw new not_found(`job not found`)
   }
   res.status(StatusCodes.OK).json(jobs)

}
const createJob = async(req,res) =>{
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({job})
}
const deleteJob = async(req,res)=>{
    const userId = req.user.userId
    const jobId = req.params.id
    const job  = await Job.findByIdAndRemove({_id:jobId,createdBy:userId})
    if(!job){
        throw new not_found('job to be deleted is not found')
    }
    res.status(StatusCodes.OK).send()



}
const updateJob = async(req,res)=>{
   const userId = req.user.userId
   const jobId = req.params.id
  
   const job = await Job.findOneAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true,runValidators:true})
   if(!job){
    throw new not_found('job to be updated is not found')
   }
res.status(StatusCodes.OK).json({job})
}

module.exports = {
    getAllJob ,  
    getJob,
    createJob,
    deleteJob,
    updateJob
}