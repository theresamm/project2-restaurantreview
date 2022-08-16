const mongodb = require('mongodb');
function connect(){
    const client = mongodb.connect("mongodb+srv://user:DRiueeqDbJLvXSPp@cluster1.4ilix.mongodb.net/?retryWrites=true&w=majority",{
        useUnifiedTopology: true
        })
}