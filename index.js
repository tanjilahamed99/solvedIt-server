const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('welcome to my server site')
})


//solvedIt 
// cti8uYBy0JUK1qKt



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://solvedIt:cti8uYBy0JUK1qKt@cluster0.8mn4lkn.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const taskCollection = client.db("SolvedIt").collection("task");

        // get all task
        app.get('/task'async (req, res) => {
            const result = await taskCollection.find().toArray()
            res.send(result)
        })
        
        // new task add api
        app.post('/task', async (req, res) => {
            const newTask = req.body
            const result = await taskCollection.insertOne(newTask)
            res.send(result)
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`app running on port ${port}`)
})