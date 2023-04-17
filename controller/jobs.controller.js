const { ObjectId } = require("mongodb");
const dbConnect = require("../utils/dbConnect");

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

// module.exports.searchJob = async (req, res) => {
//     try {
//         const regex = new RegExp(req.params.query, 'i');
//         const jobs = await jobCollection.find({ $or: [{ title: regex }, { location: regex }] });
//         res.send(jobs);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// }