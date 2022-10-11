
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
 
   const uri = process.env.MONGO_URL;
 
  try {
    // Connect to the MongoDB cluster   
    await mongoose.connect(uri)
    .then(()=> console.log("connect Succes"))
    .catch((err) => {console.error(err)});

    await createListing();

  } finally {
    // Close the connection to the MongoDB cluster
    await mongoose.connection.close()
    console.log("connect Closed") 
  }
}

main().catch(console.error);


async function createListing() { 

  const piscSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    pool: String,
    point: Number,
    isAdd:Boolean
  });

  const piscModel = mongoose.model('piscModel', piscSchema,  'PointPiscine');

  var itemPisc = new piscModel({  
    date:"12.10.2022",
    pool:"dsfs",
    point: 70,
    isAdd:false 
  });

  try {
    console.log(await itemPisc.save());
  } catch (err) {
    console.log(err);
  }
  // itemPisc.save(function (err, res) {
  //     if (err) console.error(err);
  //     console.log(res)
  //   });

    console.log("fin function call")


}
