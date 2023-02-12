const express=require('express')
const cors=require('cors')
const {MongoClient}=require('mongodb')

require('dotenv').config()

const app=express()

app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.name}:${process.env.password}@cluster0.koa7uom.mongodb.net/?retryWrites=true&w=majority`;

const port=process.env.PORT || 2020

const client=new MongoClient(uri)
const database=client.db("shop")
const products=database.collection("products")


app.get('/',async(req,res)=>{
    try{
        let skip=10*req.query.page
        const count=await products.count()
        const result=await products.find().limit(10).skip(skip).toArray()
        

        res.send({count,result})
        console.log(req.query,skip,req.url)
    }
    catch(err){
        console.log(err);
    }
})

app.listen(port,()=>{
    console.log("Server is running on port.  "+port)
})

// ema-jhon 
// CwAFd0UzP0ebtnsG