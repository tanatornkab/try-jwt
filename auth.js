const jwt = require('jsonwebtoken')
const { jwt_key } = require('./config')

const auth= async (req,res, next)=>{

    let token = req.header('Authorization')
    let decoded 
    try{
        decoded = await jwt.verify(token,jwt_key)
        req.decoded= decoded
        next()
    }catch(err){
            console.log(`invalid token ${err}`)
            res.status(401).json({error:err})
            return
    }
}

  
module.exports = auth