const express = require ("express")
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");



const {sequelize} =require('./models')


const app = express();
app.use(fileUpload());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(cookieParser());


// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "",
//     database: "fyp",
// });

// const adminRouter = require("./routes/Admin");
// 
app.use("/burger", require("./routes/Burger"));






app.listen(3001, async () =>{
    console.log("Server running on port 3001");
    await sequelize.authenticate()
    console.log("Database Connected!")
})