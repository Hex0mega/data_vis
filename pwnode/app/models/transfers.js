// grab the mongoose module
var mongoose = require('mongoose');
//set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/transferMarkets';
mongoose.connect(mongoDB, { useMongoClient: true });

//get the default connection
var db = mongoose.connection;
//bind connection to error event(to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//define transfers schema
var Schema = mongoose.Schema;
var transfersSchema = new Schema({
    Name: String,
    MovingFrom: String,
    MovingTo: String,
    FeeInPounds: String,
    Date: String,
    TransferWindow: String
}, { collection: 'transfers' });

//define our model for transfers
module.exports = mongoose.model('Transfers', transfersSchema);
