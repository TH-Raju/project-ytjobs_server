const { ObjectId } = require("mongodb");
const dbConnect = require("../utils/dbConnect");
const { response } = require("express");

const jobCollection = dbConnect().db('ydJobs').collection('jobs');

module.exports.getJobs = async (req, res) => {
    const query = {}
    const cursor = jobCollection.find(query)
    const jobs = await cursor.toArray();
    res.send(jobs)
}

module.exports.getSingleJob = async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const jobs = await jobCollection.findOne(query);
    res.send(jobs)
}

module.exports.postJob = async (req, res) => {
    const postJob = req.body;
    const result = await jobCollection.insertOne(postJob)
    res.send(result)
}
module.exports.searchJob = async (req, res) => {
    try {
        const { key, page, limit } = req.query
        const skip = (page - 1) * limit
        const search = key ? {
            "$or": [
                { title: { $regex: key, $options: "$i" } },
                { description: { $regex: key, $options: "$i" } },
            ]
        } : []
        const data = await jobCollection.find(search)
            .populate("author").skip(skip).limit(limit)
    } catch (err) {
        console.log(err);
    }
}

// module.exports.searchJob = async (req, res) => {
//     const search = req.params.id;
//     const jobs = await jobCollection.find({ $or: [{ title: search }, { location: search }] });
//     res.json(jobs)
//     res.send(jobs)
// }

