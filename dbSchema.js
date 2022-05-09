let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
var dbName = 'Product';
var dbUrl = `mongodb+srv://Harmit1708:Harmit@cluster0.brz2m.mongodb.net/${dbName}`;
module.exports = {mongodb,MongoClient,dbUrl}