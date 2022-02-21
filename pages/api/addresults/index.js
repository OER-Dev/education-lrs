import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 7000,
}


export default function handler(req, res) {
    async function addResults() {
        const client = new MongoClient(uri, options);
        const statement = JSON.stringify(req.body);
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