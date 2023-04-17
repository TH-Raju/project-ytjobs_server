const express = require('express')
const cors = require('cors');
const router = require('./routes/jobs.route');
const dbConnect = require('./utils/dbConnect');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const jobRoute = require('./routes/jobs.route')


// middleware
app.use(cors());
app.use(express.json());

// DB
dbConnect();


// Route
app.use("/jobs", jobRoute)


app.get('/', (req, res) => {
    res.send("Server Working...")
})
app.listen(port, () => {
    console.log(`Server Running on ${port} port...`)
})