const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoUtil = require('./MongoUtil');
const { ObjectId } = require('mongodb');

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
    app.get('/restaurantreviews', async function (req,res){
        let criteria = {};
        if (req.query.name){
            criteria.name = {
                '$regex': req.query.name,
                '$options':'i'
            }
        }
        if (req.query.min_rating){
            criteria.rating = {
                '$gte':parseInt(req.query.min_rating)
            }
        }
        const restreviews = await db.collection('restaurantreviews').find(criteria).toArray();
        res.json(restreviews);
    })

    app.post('/restaurantreviews', async function (req,res){
        const results = await db.collection('restaurantreviews').insertOne({
            "name":req.body.name,
            "cuisine":req.body.cuisine,
            "location":req.body.location,
            "bestseller":req.body.bestseller,
            "rating":req.body.rating
        })
        res.json({
            'message':'New review done',
            'results': result
        })
    })
    app.put('/restaurantreviews/:reviewId', async function(req,res){
        const review = await db.collection('restaurantreviews').findOne({
            '_id':ObjectId(req.params.reviewId)
        })
        const results = await db.collection('restaurantreviews').updateOne({
            '_id':ObjectId(req.params.reviewId)
    },{
        "$set":{
            'name':req.body.name ? req.body.name : review.name,
            'cuisine':req.body.cuisine ? req.body.cuisine : review.cuisine,
            'location':req.body.location ? req.body.location : review.location,
            'bestseller':req.body.bestseller ? req.body.bestseller : review.bestseller,
            'rating':req.body.rating ? req.body.rating : review.rating
        }
    })
    res.json({
        'message':'Updated review',
        'results': results
    })
    })
    app.delete('/restaurantreviews/:reviewId', async function(req,res){
        await db.collection('restaurantreviews').deleteOne({
            '_id':ObjectId(req.params.reviewId)
        })
        res.json({
            'message':"Deleted"
        })
    })
}
main();

app.listen(3000,function(){
    console.log("server has started")
})