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
    const JobsCollection = client.db('usersDb').collection('jobs');
    const ApplyJobCollection = client.db('usersDb').collection('job_application');
    const AddJobsCollection = client.db('usersDb').collection('add_job_application');

    // Get all jobs
    app.get('/jobs', async (req, res) => {
      try {
        const results = await JobsCollection.find().toArray();
        res.send(results);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch jobs" });
      }
    });

    // Get job by ID
    app.get('/jobs/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await JobsCollection.findOne(query);
        if (!result) {
          return res.status(404).send({ error: "Job not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Invalid Job ID" });
      }
    });

    // Add a new job application
    app.post("/job-applications", async (req, res) => {
      try {
        const result = await AddJobsCollection.insertOne(req.body);
        if (result.insertedId) {
          res.json({ insertedId: result.insertedId });
        } else {
          throw new Error("Job could not be added. Try again.");
        }
      } catch (error) {
        console.error("Database Insert Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Get jobs posted by a specific HR (filtered by email)
    app.get('/addJobs', async (req, res) => {
      try {
        const email = req.query.email; // Use req.query instead of req.body
        if (!email) {
          return res.status(400).send({ error: "Email query parameter is required" });
        }

        // hr_email
        const query = { hr_email: email }; // Ensure the field exists in DB
        const result = await AddJobsCollection.find(query).toArray(); // Use find() instead of findOne()
        res.send(result);
      } catch (error) {
        console.error("Error fetching HR jobs:", error);
        res.status(500).send({ error: "Failed to fetch HR jobs" });
      }
    });

    // Apply for a job
    app.post("/jobs/apply", async (req, res) => {
      try {
        const result = await ApplyJobCollection.insertOne(req.body);
        if (result.insertedId) {
          res.json({ insertedId: result.insertedId });
        } else {
          throw new Error("Job application failed. Try again.");
        }
      } catch (error) {
        console.error("Database Insert Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Get job applications filtered by email
    app.get('/job-application', async (req, res) => {
      try {
        const email = req.query.email;
        if (!email) {
          return res.status(400).send({ error: "Email query parameter is required" });
        }

        const query = { applicant_email: email }; // Ensure correct field name
        const result = await ApplyJobCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching job applications:", error);
        res.status(500).send({ error: "Failed to fetch applications" });
      }
    });

    // Default route
    app.get('/', (req, res) => {
      res.send('Jobs API is running');
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Run the function to start the app
run();
