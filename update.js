const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
require('dotenv').config();

async function main() {

    const uri = process.env.MONGO_URL;

    try {
        await mongoose.connect(uri)
            .then(() => console.log("connect Succes"))
            .catch((err) => { console.error(err) });

        await UpdatePisc()    
    }
    finally {
        // Close the connection to the MongoDB cluster
        //await mongoose.connection.close()
    }
}

main().catch(console.error);

async function UpdatePisc() {
    const piscSchema = new mongoose.Schema({
        name: String,
        date: { type: Date, default: Date.now },
        pool: String,
        point: Number,
        isAdd: Boolean
    });

    const piscModel = mongoose.model('piscModel', piscSchema, 'PointPiscine');

    piscModel.updateOne({ pool: 'dsfs' }, { point: '100' }, function (err, res) {
        if (err) console.error(err);
        console.log(res)

    });

}
