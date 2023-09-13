const express = require("express")
const router = express.Router()
const {getAllJob , getJob,createJob,deleteJob,updateJob} = require("../controllers/jobs")

router.route("/").get(getAllJob).post(createJob)
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob)

module.exports=router;