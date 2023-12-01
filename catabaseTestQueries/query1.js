const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('catabase');
    const cats = database.collection('cats');

    // Query 1: Tind top 5 lowest-rated shelters on average, excluding shelters without any rating
    // Return shelter ID, name, and average ratings

    const cursor = await cats.aggregate(
        [
            {
                $unwind: { path: '$shelter.user_ratings' }
            },
            {
                $group: {
                _id: {
                    shelterID: '$shelter.shelter_id',
                    shelterName: '$shelter.shelter_name'
                },
                avgRating: {
                    $avg: '$shelter.user_ratings.rating_score'
                }
                }
            },
            { $sort: { avgRating: 1 } }
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
    ).limit(5);

    for await (const doc of cursor) {
        console.dir(doc);
    }

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);