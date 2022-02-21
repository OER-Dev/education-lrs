import { MongoClient } from 'mongodb'
import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

const uri = process.env.MONGODB_URI

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 7000,
}


export default function handler(req, res) {
    async function addResults() {
        // Run cors
        await cors(req, res)
        
        const client = new MongoClient(uri, options);
        const statement = req.body;
        const time = new Date();
        const response = {
            "appId": 1,
            "timestamp": time,
            "results": statement
        }

        try {
            await client.connect();

            await client.db("assessment").collection("results").insertOne(response);

        } catch (e) {
            console.error(e);
            res.status(400).json("Error")
        } finally {
            res.status(200).json(response)
            await client.close();
        }

    }

    addResults().catch(console.error);


}