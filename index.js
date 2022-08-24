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
        try{
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
        const restreviews = await db.collection('restaurantreviews').find(criteria,{
            'projection':{
                '_id':1,
                'name':1,
                'cuisine':1,
                'location':1,
                'bestseller':1,
                'rating':1
            }
        }).toArray();
        res.json(restreviews);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            'error': "Internal server error"
        })
    }
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
            'results': results
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
    app.post('/restaurantreviews/:reviewId/comments', async function (req,res){
        const results = await db.collection('restaurantreviews').updateOne({
            _id: ObjectId(req.params.reviewId)
        },{
            '$push': {
                'comments':{
                    '_id': ObjectId(),
                    'reviewer_name': req.body.reviewer_name,
                    'comment': req.body.comment,
                    'date_of_visit': req.body.date_of_visit
                }
            }    
        })
        res.json({
            'message': 'New comment added',
            'results': results
        })
    })
    app.put('/comments/:commentId', async function (req,res){
        const results = await db.collection('restaurantreviews').updateOne({
            'comments._id': ObjectId(req.params.commentId)
        },{
            '$set':{
                'comments.$.reviewer_name':req.body.reviewer_name,
                'comments.$.comment': req.body.comment,
                'comments.$.date_of_visit':req.body.date_of_visit
            }
        })
        res.json({
            'message': 'Review details updated',
            'results': results
        })
    })
    app.delete('/comments/:commentId', async function (req,res){
        const results = await db.collection('restaurantreviews').updateOne({
            'comments._id':ObjectId(req.params.commentId)
        },{
            '$pull':{
                'comments':{
                    '_id': ObjectId(req.params.commentId)
                }
            }
        })
        res.json({
            'message':'Review deleted',
            'results':results
        })
    })
    app.get('/restaurantreviews/:reviewId', async function(req,res){
        const review = await db.collection('restaurantreviews').findOne({
            _id:ObjectId(req.params.reviewId)
        });
        res.json(review);
    })
}
main();

app.listen(3000,function(){
    console.log("server has started")
})