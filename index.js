const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoUtil = require('./MongoUtil');

const app = express();
app.use(express.json())
app.use(cors());

const MONGOURI = process.env.MONGOURI;
const DBNAME = process.env.DBNAME;

async function main(){
    const db = await mongoUtil.connect(MONGOURI, DBNAME);
    app.get('/', function(req,res){
        res.json({
            'text':'hello'
        });
    })
    app.post('/restaurantreviews', async function (req,res){
        await db.collection('restaurantreviews').insertOne({
            "name":"Oishi Restaurant",
            "cuisine":"Japanese",
            "location":"Manila",
            "bestseller":"Tempura",
            "rating":5
        })
        res.json({
            'message':'done'
        })
    })
}
main();

app.listen(3000,function(){
    console.log("server has started")
})