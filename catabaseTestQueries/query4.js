const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('catabase');
    const cats = database.collection('cats');

    // Query 4: Find a Siamese cat named "Otcom" with a patient personality
    // and approve their current adoption status

    await cats.updateOne(
        {
            cat_name: "Otcom", cat_breed: "Siamese", cat_personality: "Patient",
            "adoption_details.user_id" : {$exists: true}
        },
        {
            $set: {
                "adoption_details.$.adoption_approved": true
            }
        }
    );

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);