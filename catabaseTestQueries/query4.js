const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('catabase');
    const cats = database.collection('cats');

    // Query 4: Find a Sphynx cat named "Matsoft" with an organized personality
    // and disapprove their current adoption status

    await cats.updateOne(
        {
            cat_name: "Matsoft", cat_breed: "Sphynx", cat_personality: "Organized",
            "adoption_details.user_id" : {$exists: true}
        },
        {
            $set: {
                "adoption_details.$.adoption_approved": false
            }
        }
    );

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);