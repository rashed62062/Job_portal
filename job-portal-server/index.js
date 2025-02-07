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

    // Define collection
    const JobsCollection = client.db('usersDb').collection('jobs');
    const jobApplicationCollection = client.db('usersDb').collection('job_application');

    // Jobs API
    app.get('/jobs', async (req, res) => {
      try {
        const results = await JobsCollection.find().toArray();
        res.send(results);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch jobs" });
      }
    });
//  job apply 

    app.get('/jobs/:id', async (req, res) => {
       const id  = req.params.id;
       const query = { _id : new ObjectId(id)}
       const  results = await  JobsCollection.findOne(query)
       res.send(results)
    })
    app.post('/job-applications', async (req, res) => {
      const application = req.body;
     
      const results = jobApplicationCollection.insertOne(application)
      
       res.send(results)
    })

  //   app.get('/jobs', async (req, res) => {
  //     try {
  //         const limit = parseInt(req.query.limit) || 6; // Default limit is 3 if not provided
  //         const results = await JobsCollection.find().limit(limit).toArray();
  //         res.send(results);
  //     } catch (error) {
  //         res.status(500).send({ error: "Failed to fetch jobs" });
  //     }
  // });
  


  //  get  all applications filtered by . emails filter
  app.get('/job-application', async (req, res) => {
    try {
      const email = req.query.email;
      const query = { applicant_email
        : email };
  
      const result = await jobApplicationCollection.find(query).toArray();
  
      // Aggregate job details for each application
      for (const application of result) {
        const query1 = { _id: new ObjectId(application.job_id) };

        
      }
  
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: "Failed to fetch applications" });
    }
  });


    // Default route
    app.get('/', (req, res) => {
      res.send('Jobs API is running');
    });

    // Start the server only after successful DB connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Run the function to start the app
run();
