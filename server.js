const express = require('express')
const mongodb = require('mongodb')
const bcrypt = require('bcryptjs')


const app = express()
const port = process.env.PORT

const MongoCilent = mongodb.MongoClient
const Mongo_URL = process.env.mondoDB_url

app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))

app.post('/resister',async (req,res)=>{
    // name emait id pass 
    let name = req.body.name
    let email = req.body.email
    let studentID = req.body.studentID
    let encrpit_password = await bcrypt.hash(req.body.password,15)

    const o ={
        name:name,
        email:email,
        studentID:studentID,
        password:encrpit_password
    }
    // const client =await MongoCilent.connect(Mongo_URL,{
    //     useNewUrlParser:true,
    //     useUnifiedTopology:true
    //     }).catch((err)=>{
    //         console.log(`Cannot cannect to Mongodb: ${err}`)
    //         res.status(500).json({error:err})
    //         return
    // })
    const client =await require('./db') 
    const db= client.db('BUU')
    const r =await db.collection('users').insertOne(o)
    .catch((err)=>{
        console.log(`Cannot insert to Mongodb: ${err}`)
        res.status(400).json({error:err})
     
    })
    let result  = { _id:o._id,name: o.name,email:o.email,id:o.studentID}
    res.status(200).json(result)
    
})

app.post('/sing-in',async (req,res)=>{
    let email = req.body.email
    let password = req.body.password

    const client =await require('./db') 
    let db = client.db('BUU')
    let user = await db.collection('users')
        .findOne({email: email})
        .catch((err)=>{
            console.log(`Cannot find to Mongodb: ${err}`)
            res.status(500).json({error:err})
        })


    if(!user){
        res.status(401).json({error: "username/password is not match"})
        return
    }
    let passwordIsValid =await bcrypt.compare(password,user.password)


    if(!passwordIsValid){
        res.status(401).json({error: "username/password is not match"})
        return
    }
  
    res.status(200).json({token:"123456789"})
})



app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))