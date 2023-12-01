const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('catabase');
    const cats = database.collection('cats');

    // Test Query
    const query = { cat_id: 4 };
    const cat = await cats.findOne(query);
    console.log(cat);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);