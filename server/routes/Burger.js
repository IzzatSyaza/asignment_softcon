const express = require("express");
const router = express.Router();
// const db = require("../config/dbConn")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require('dotenv').config();
const {User, Product, Order} = require('../models')



const saltRounds = 10;

router.post("/login", async (req, res) => {
    console.log(req.body)
   const {username, password} = req.body;
   if(!username || !password) return res.json({err: 'Username and password required'});

   const foundUser = await User.findOne({where: {username}});
   if (!foundUser) return res.sendStatus(401) //Unauthorized
   //evaluate password

   if(foundUser.password === password){
        res.json({auth: true, message: "You are logged in", user: foundUser});
   }else {
        res.json({auth: false, err: "Wrong Username or Password"});

   }
   

});

router.post("/register",async (req, res) => {
    console.log(req.body)

    const username = req.body.username;
    const password = req.body.password;
    const address = req.body.address;
    const duplicate = await User.findOne({where: {username}})
    if(duplicate) return res.sendStatus(409).json({err: "The username already exist"});

    try{

        const user = await User.create({username, password, address})
        return res.json({message:"New User Successfully Added"})
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }

   
});

router.post("/addproduct",async (req, res) => {
    console.log(req.body)

    const itemName = req.body.itemName;
    const price = req.body.price;
    // const duplicate = await User.findOne({where: {username}})
    // if(duplicate) return res.sendStatus(409).json({err: "The username already exist"});

    try{

        const product = await Product.create({name: itemName, price})
        return res.json({message:"New Product Successfully Added"})
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }

   
});

router.get("/getproduct", async (req,res) => {

    try{
        const product = await Product.findAll()
        return res.json(product)
    }catch(err){
        console.log(err)
        return res.status(500).json({err: 'Something went wrong'})
    }
})

router.get("/getorder", async (req,res) => {
    const userid= req.query.id
    console.log(userid)

    try{
        const order = await Order.findAll({where: {userId: userid}})
        return res.json(order)
    }catch(err){
        console.log(err)
        return res.status(500).json({err: 'Something went wrong'})
    }
})

router.post("/order", (req, res) => {
    // const {username, password1} = req.body;

    const myArray = req.body.quantity;
    const userId = req.body.userid;
    console.log(req.body)

    try{
         myArray.forEach( async (arrayItem) => {
            let quantity = arrayItem.quantity;
            let product = await Product.findOne({where: {id: arrayItem.productId}})
            let totalprice = product.price * quantity;
            const order = await Order.create({name: product.name, quantity, totalprice, userId})
        });
        return res.json({message:"Your Order are on the way"})
    }catch(err){
        console.log(err)
        return res.status(400).json(err)

    }
});


module.exports = router;