const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors());
app.get('/', function(req,res){
    res.json({
        'text':'hello'
    });
})
app.listen(3000,function(){
    console.log("server has started")
})