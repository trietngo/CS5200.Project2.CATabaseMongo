const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('catabase');
    const cats = database.collection('cats');

    // Query 3: Count the number of cats applied for by user named Marian Malthus

    const cursor = await cats.aggregate(
        [
            {   $unwind: { path: '$adoption_details' } },
            {
                $match: {
                    'adoption_details.user_first_name':
                    'Marian',
                    'adoption_details.user_last_name':
                    'Malthus'
                }
            },
            {
                $count: 'Number of cats applied for by Marian Malthus'
            }
          ],
          { maxTimeMS: 60000, allowDiskUse: true }
    );

    for await (const doc of cursor) {
        console.dir(doc);
    }

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);