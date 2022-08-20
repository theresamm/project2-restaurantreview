const MongoClient = require('mongodb').MongoClient;
async function connect(mongoUri, databasename){
        const client = await MongoClient.connect(mongoUri,{
        useUnifiedTopology: true
        })
        const db = client.db(databasename);
        return db;
}
module.exports = {connect}