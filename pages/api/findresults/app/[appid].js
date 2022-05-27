//import { MongoClient } from 'mongodb'
import clientPromise from '../../../../lib/mongodb'

const uri = process.env.MONGODB_URI

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 7000,
}

//have closed the API by hardcoding 17 in the appId field
export default function handler({ query: { appid } }, res) {
    async function findResultsUi() {
        const client = await clientPromise
        const db = client.db('assessment')

        const cursor = db.collection("results")
            .find({
                appId: { $eq: parseInt("17") }
            })
            .sort({ userId: -1 });

        const results = await cursor.toArray();

        res.json(results);
        return;
    }

    findResultsUi().catch(console.error);

}