const getAllJob = async (req,res) =>{
   res.status(200).json({msg:'get All Jobs'})

}
const getJob = async(req,res) =>{
   res.status(200).send('get Job')

}
const createJob = async(req,res) =>{
   res.status(200).send("create Job")
}
const deleteJob = async(req,res)=>{
    res.status(200).send("delete Job")
}
const updateJob = async(req,res)=>{
    res.status(200).send("update job")
}

module.exports = {
    getAllJob ,  
    getJob,
    createJob,
    deleteJob,
    updateJob
}