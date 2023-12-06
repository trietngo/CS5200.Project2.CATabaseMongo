const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('catabase');
    const cats = database.collection('cats');

    // Query 5: Create a Potential Adopters Collection from the Cats Collection

    const cursor = await cats.aggregate(
        [
            { $unwind: { path: '$adoption_details' } },
            {
              $group: {
                _id: {
                  userID: '$adoption_details.user_id'
                },
                user: { $min: '$adoption_details' }
              }
            },
            {
              $project: {
                _id: 0,
                'user.adoption_approved': 0
              }
            },
            { $replaceRoot: { newRoot: '$user' } },
            { $sort: { user_id: 1 }},
            { $out: 'potential_adopters'}
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