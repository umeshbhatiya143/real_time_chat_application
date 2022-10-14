const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const app = express();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

app.use(cors());
app.use(express.json());

//use userRoutes for api calling
app.use("/api/auth",userRoutes);

console.log(userRoutes);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
.then(() =>{
    console.log("DB Connection Successfully"); 
})
.catch((err)=>{
    console.log(err.message);
});

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server Started on Port ${process.env.PORT}`);
});
