
const mongodb = require('mongodb')

const MongoCilent = mongodb.MongoClient
const { mondoDB_url } = require('./config')

module.exports = (async ()=>{

    const client =await MongoCilent.connect(mondoDB_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
      
    })
    return client
})()