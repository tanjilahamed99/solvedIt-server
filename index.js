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



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        app.get('/task/:email', async (req, res) => {
            const email = req.params.email
            const filter = { email: email }
            console.log(email)
            const result = await taskCollection.find(filter).toArray()
            res.send(result)
        })
        // get single task
        app.get('/getTask/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const result = await taskCollection.findOne(filter)
            res.send(result)
        })

        // new task add api
        app.post('/task', async (req, res) => {
            const newTask = req.body
            const result = await taskCollection.insertOne(newTask)
            res.send(result)
        })
        // make ongoing 
        app.patch('/task/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    ongoing: true
                }
            }
            const result = await taskCollection.updateOne(query, updateDoc)
            res.send(result)
        })
        // task make completed  
        app.patch('/taskCompleted/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    completed: true
                }
            }
            const result = await taskCollection.updateOne(query, updateDoc)
            res.send(result)
        })
        // delete task
        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await taskCollection.deleteOne(query)
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