const express = require('express')
const router = express.Router();
const jobController = require("../controller/jobs.controller.js");

router.route('/').get(jobController.getJobs).post(jobController.postJob)
router.route('/:id').get(jobController.getSingleJob)
// router.route('/:query').get(jobController.searchJob)

module.exports = router;