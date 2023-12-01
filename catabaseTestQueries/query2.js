const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('catabase');
    const cats = database.collection('cats');

    // Query 2: Find all without any adoption details and weigh less than 10lbs and display
    // cat info, excluding shelter and adoption_details fields

    const cursor = await cats.find(
        {
            $and: [{
                adoption_details: {
                    $size: 0
                }
                }, {
                cat_weight_lb: {
                    $lt: 10
                }
            }]
        }
    ).project({
        "_id": 0,
        "shelter": 0,
        "adoption_details": 0
    });

    for await (const doc of cursor) {
        console.dir(doc);
    }

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);