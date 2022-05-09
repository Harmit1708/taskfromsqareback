var express = require('express');
var router = express.Router();
const {ObjectId} = require("mongodb")
var {mongodb,MongoClient,dbUrl} = require("../dbSchema");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/cart/item",async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    let db =await client.db("Product");
    let productid = await db.collection("cart").findOne({product_id : req.body.product_id})
    console.log(productid)
    if(productid){
      let update = await db.collection("cart").updateOne({product_id:req.body.product_id},{$inc:{qty:req.body.qty}})
      res.json({
        statusCode:200,
        message:"Success"
      })
    }
    else {
      let product = await db.collection("cart").insertOne(req.body);
      res.json({
        statusCode:200,
        message:"Item Add Successfully",
        data : product
      })
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode:500,
      message:"Internal Server Error"
    })
  }
})

router.get('/cart/items',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = await client.db("Product");
    let product = await db.collection("cart").find().toArray();
    if(product){
      res.json({
        statusCode:200,
        message:"Item available in the cart",
        items:product
      })
    }
    else{
      res.json({
        statusCode:400,
        message:"Cart Is Empty"
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error"
    })
  }
})

router.delete('/cart/item/delete/:id',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = await client.db("Product");
    let product = await db.collection("cart").find()
    if(product){
      let RemoveProductFromCart = await db.collection("cart").deleteOne({ _id: ObjectId(req.params.id) })
      res.json({
        statusCode:200,
        message:"Remove Successfully",
      })
    }
    else{
      res.json({
        statusCode:400,
        message:"Cart Is Empty"
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error"
    })
  }
})  


module.exports = router;
