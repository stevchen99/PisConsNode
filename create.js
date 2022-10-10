const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/drivers/node/ for more details
   */
   const uri = process.env.MONGO_URL;

  /**
   * The Mongo Client you will use to interact with your database
   * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
   * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
   * pass option { useUnifiedTopology: true } to the MongoClient constructor.
   * const client =  new MongoClient(uri, {useUnifiedTopology: true})
   */
  //const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    //await client.connect();
    await mongoose.connect(uri);

    // Make the appropriate DB calls

    // Create a single new listing
    await createListing();
  } finally {
    // Close the connection to the MongoDB cluster
    await mongoose.connection.close()
  }
}

main().catch(console.error);

/**
 * Create a new Airbnb listing
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {Object} newListing The new listing to be added
 */
async function createListing() {
  // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne for the insertOne() docs
  // const result = await client
  //   .db("ExtApp")
  //   .collection("PointPiscine")
  //   .insertOne(newListing);
  // console.log(
  //   `New listing created with the following id: ${result.insertedId}`
  // );

  const piscSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    pool: String,
    point: Number,
    isAdd:Boolean
  });

  const piscModel = mongoose.model('piscModel', piscSchema);

  var itemPisc = new piscModel({  
    date:"12.10.2022",
    pool:"dsfs",
    point: 70,
    isAdd:false 
  });

  // piscModel.create(itemPisc, function (err, small) {
  //   if (err) return handleError(err);
  //   // saved!
  // });

  itemPisc.save(function (err, res) {
      if (err) console.error(err);
      console.log(res)
    });


}
