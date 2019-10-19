
const mongodb = require('mongodb')

const MongoCilent = mongodb.MongoClient
const Mongo_URL = process.env.mondoDB_url

module.exports = (async ()=>{

    const client =await MongoCilent.connect(Mongo_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
      
    })
    return client
})()