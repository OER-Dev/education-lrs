import clientPromise from '../../../lib/mongodb'
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


export default async function handler(req, res) {
    // Run cors
    await cors(req, res)

    async function addResults() {
        const client = await clientPromise
        const db = client.db('assessment')
        const statement = req.body
        const time = new Date()

        const response = {
            appId: 1,
            timestamp: time,
            results: statement,
        }

        try {
            await db.collection('results').insertOne(response)
        } catch (e) {
            console.error(e)
            res.status(400).json('Error')
        } finally {
            res.status(200).json('One record added in db')
        }
    }

    addResults().catch(console.error)
}