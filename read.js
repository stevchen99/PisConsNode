require('dotenv').config();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

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

        // Find the listing named "Infinite Views" that we created in create.js
       //
        await findOneListingByName(mongoose, 10);

        await findAll();
       

    } finally {
        // Close the connection to the MongoDB cluster
        await mongoose.connection.close()
    }
}

main().catch(console.error);

async function findAll(){
    const piscSchema = new mongoose.Schema({
        name: String,
        date: { type: Date, default: Date.now },
        pool: String,
        point: Number,
        isAdd:Boolean
      });

      const piscModel = mongoose.model('piscModel', piscSchema, 'PointPiscine');

      const result = piscModel.find({});
      console.log(result);
}

/**
 * Print an Airbnb listing with the given name
 * Note: If more than one listing has the same name, only the first listing the database finds will be printed.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} nameOfListing The name of the listing you want to find
 */
async function findOneListingByName(client, nameOfListing) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
    //const result = await client.db("ExtApp").collection("PointPiscine").findOne({ point: nameOfListing });

    const piscSchema = new mongoose.Schema({
        name: String,
        date: { type: Date, default: Date.now },
        pool: String,
        point: Number,
        isAdd:Boolean
      });

      const piscModel = mongoose.model('piscModel', piscSchema, 'PointPiscine');

      const result = piscModel.find({ point: 100 });


    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

