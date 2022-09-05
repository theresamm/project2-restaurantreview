const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jsonwt = require ('jsonwebtoken');

const mongoUtil = require('./MongoUtil');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json())
app.use(cors());

const MONGOURI = process.env.MONGOURI;
const DBNAME = process.env.DBNAME;
const SECRET_TOKEN=process.env.SECRET_TOKEN;

function getAccessToken(id, email) {
    return jsonwt.sign({
        'id':id,
        'email': email
    }, SECRET_TOKEN,{
        'expiresIn':'2h'
    })
}

function verifyAuthenticationJwt(req,res,next){
    if (req.headers.authorization){
        const headers = req.headers.authorization;
        const token = headers.split(" ")[1];
        jsonwt.verify(token, SECRET_TOKEN, function(invalid, tokenData){
            if (invalid){
                res.status(403);
                res.json({
                    'error':"Invalid access token"
                })
                return;
            }
            req.user = tokenData;
            next();
        })
    } else {
        res.status(403);
        res.json({
            'error':"Please provide an access token"
        })
    }
}

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
        if (req.query.cuisine){
            criteria.cuisine = {
                '$regex': req.query.cuisine,
                '$options':'i'
            }
        }
        if (req.query.location){
            criteria.location = {
                '$regex': req.query.location,
                '$options':'i'
            }
        }
        if (req.query.bestseller){
            criteria.bestseller = {
                '$regex': req.query.bestseller,
                '$options':'i'
            }
        }
        if (req.query.meals){
            criteria.meals = {
                '$regex': req.query.meals,
                '$options':'i'
            }
        }
        if (req.query.average_cost){
            criteria.average_cost = {
                '$lte':parseInt(req.query.average_cost)
            }
        }
        if (req.query.store_hours){
            criteria.store_hours = {
                '$elemMatch': req.query.store_hours,
                '$options':'i'
            }
        }
        if (req.query.dining){
            criteria.dining = {
                '$elemMatch': req.query.dining,
                '$options':'i'
            }
        }
        if (req.query.features){
            criteria.features = {
                '$regex': req.query.features,
                '$options':'i'
            }
        }
        if (req.query.contact){
            criteria.contact = {
                '$regex': req.query.contact,
                '$options':'i'
            }
        }
        if (req.query.rating){
            criteria.rating = {
                '$gte':parseInt(req.query.rating)
            }
        }
        const restreviews = await db.collection('restaurantreviews').find(criteria,{
            'projection':{
                '_id':1,
                'name':1,
                'cuisine':1,
                'location':1,
                'bestseller':1,
                'meals':1,
                'average_cost':1,
                'store_hours':1,
                'dining':1,
                'features':1,
                'contact':1,
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

    app.post('/restaurantreviews', verifyAuthenticationJwt, async function (req,res){
        try{
        const results = await db.collection('restaurantreviews').insertOne({
            "name":req.body.name,
            "cuisine":req.body.cuisine,
            "location":req.body.location,
            "bestseller":req.body.bestseller,
            "meals":req.body.meals,
            "average_cost":req.body.average_cost,
            "store_hours":req.body.store_hours,
            "dining":req.body.dining,
            "features":req.body.features,
            "contact":req.body.contact,
            "rating":req.body.rating
        })
        res.json({
            'message':'New review created',
            'results': results
        })
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            'error': "Internal server error"
        })
    }
    })
    app.put('/restaurantreviews/:reviewId', verifyAuthenticationJwt, async function(req,res){
        try{
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
            'meals':req.body.meals ? req.body.meals : review.meals,
            'average_cost':req.body.average_cost ? req.body.average_cost : review.average_cost,
            'store_hours':req.body.store_hours ? req.body.store_hours : review.store_hours,
            'dining':req.body.dining ? req.body.dining : review.dining,
            'features':req.body.features ? req.body.features : review.features,
            'contact':req.body.contact ? req.body.contact : review.contact,
            'rating':req.body.rating ? req.body.rating : review.rating
        }
    })
    res.json({
        'message':'Updated review',
        'results': results
    })
} catch (e) {
    console.log(e);
    res.status(500);
    res.json({
        'error': "Internal server error"
    })
}
    })
    app.delete('/restaurantreviews/:reviewId', verifyAuthenticationJwt, async function(req,res){
        try{
        await db.collection('restaurantreviews').deleteOne({
            '_id':ObjectId(req.params.reviewId)
        })
        res.json({
            'message':"Review Deleted"
        })
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            'error': "Internal server error"
        })
    }
    })
    app.post('/restaurantreviews/:reviewId/comments', verifyAuthenticationJwt, async function (req,res){
        try{
        const results = await db.collection('restaurantreviews').updateOne({
            _id: ObjectId(req.params.reviewId)
        },{
            '$push': {
                'comments':{
                    '_id': ObjectId(),
                    'reviewer_name': req.body.reviewer_name,
                    'comment': req.body.comment,
                    'date_of_visit': req.body.date_of_visit,
                    'score': req.body.score
                }
            }    
        })
        res.json({
            'message': 'New comment created',
            'results': results
        })
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            'error': "Internal server error"
        })
    }
    })
    app.put('/comments/:commentId', verifyAuthenticationJwt, async function (req,res){
        try{
        const results = await db.collection('restaurantreviews').updateOne({
            'comments._id': ObjectId(req.params.commentId)
        },{
            '$set':{
                'comments.$.reviewer_name':req.body.reviewer_name,
                'comments.$.comment': req.body.comment,
                'comments.$.date_of_visit':req.body.date_of_visit,
                'comments.$.score':req.body.score
            }
        })
        res.json({
            'message': 'Comment details updated',
            'results': results
        })
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            'error': "Internal server error"
        })
    }
    })
    app.delete('/comments/:commentId', verifyAuthenticationJwt, async function (req,res){
        try{
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
            'message':'Comment deleted',
            'results':results
        })
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            'error': "Internal server error"
        })
    }
    })
    app.get('/restaurantreviews/:reviewId', async function(req,res){
        try{
        const review = await db.collection('restaurantreviews').findOne({
            _id:ObjectId(req.params.reviewId)
        });
        res.json(review);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            'error': "Internal server error"
        })
    }
    })
    app.post('/users', async function(req,res){
        try{
        const results = await db.collection('users').insertOne({
            "email":req.body.email,
            "password":req.body.password
        });
        res.json({
            'message':'New user created',
            'results':results
        })
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            'error': "Internal server error"
        })
    }
    })
    app.post('/login', async function(req,res){
        try{
        const user = await db.collection('users').findOne({
            'email':req.body.email,
            'password':req.body.password
        });
        if (user) {
            let token = getAccessToken(user._id, user.email);
            res.json({
                'accessToken':token
            })
        } else {
            res.status(401);
            res.json({
                'message':'Invalid email or password'
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            'error': "Internal server error"
        })
    }
    })
    app.get ('/user/:userId', verifyAuthenticationJwt, async function(req,res){
        try{
                res.json({
                    'id': req.user.id,
                    'email': req.user.email,
                    'message':'Profile view'
                })
            } catch (e) {
                console.log(e);
                res.status(500);
                res.json({
                    'error': "Internal server error"
                })
            }
    })
}
main();

app.listen(3000,function(){
    console.log("server has started")
})