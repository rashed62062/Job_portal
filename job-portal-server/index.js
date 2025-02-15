const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.is6qs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Define collections
    const jobsCollection = client.db('jobPortal').collection('jobs');
   const jobApplicationCollection = client.db('jobPortal').collection('job_applications');

// jobs related APIs
app.get('/jobs', async (req, res) => {
  const email = req.query.email;
  let query = {};
  if (email) {
      query = { hr_email: email }
  }
  const cursor = jobsCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
});

app.get('/jobs/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await jobsCollection.findOne(query);
  res.send(result);
});

app.post('/jobs', async (req, res) => {
  const newJob = req.body;
  const result = await jobsCollection.insertOne(newJob);
  res.send(result);
})


// job application apis
// get all data, get one data, get some data [o, 1, many]
app.get('/job-application', async (req, res) => {
  const email = req.query.email;
  const query = { applicant_email: email }

  console.log(req.cookies?.token)
  // token email !== query email
  if (req.user.email !== req.query.email) {
      return res.status(403).send({ message: 'forbidden access' })
  }

  const result = await jobApplicationCollection.find(query).toArray();

  // fokira way to aggregate data
  for (const application of result) {
      // console.log(application.job_id)
      const query1 = { _id: new ObjectId(application.job_id) }
      const job = await jobsCollection.findOne(query1);
      if (job) {
          application.title = job.title;
          application.location = job.location;
          application.company = job.company;
          application.company_logo = job.company_logo;
      }
  }

  res.send(result);
})

// app.get('/job-applications/:id') ==> get a specific job application by id

app.get('/job-applications', async (req, res) => {
  const jobId = req.params.job_id;
  const query = { job_id: jobId }
  const result = await jobApplicationCollection.find(query).toArray();
  res.send(result);
})
app.post('/job-applications', async (req, res) => {
  const application = req.body;

  // Ensure jobId exists
  if (!application.jobId) {
    return res.status(400).json({ error: "jobId is required" });
  }

  // Convert jobId to ObjectId
  let jobObjectId;
  try {
    jobObjectId = new ObjectId(application.jobId);
  } catch (error) {
    return res.status(400).json({ error: "Invalid jobId format" });
  }

  // Insert application
  const result = await jobApplicationCollection.insertOne(application);

  // Check if job exists
  const job = await jobsCollection.findOne({ _id: jobObjectId });

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  // Update application count
  const newCount = job.applicationCount ? job.applicationCount + 1 : 1;
  await jobsCollection.updateOne(
    { _id: jobObjectId },
    { $set: { applicationCount: newCount } }
  );

  res.send(result);
});


app.patch('/job-applications/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
      $set: {
          status: data.status
      }
  }
  const result = await jobApplicationCollection.updateOne(filter, updatedDoc);
  res.send(result)
})


} finally {
// Ensures that the client will close when you finish/error
// await client.close();
}
}
run().catch(console.dir);


app.get('/', (req, res) => {
res.send('Job is falling from the sky')
})

app.listen(port, () => {
console.log(`Job is waiting at: ${port}`)
})