const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const app = express();
const path = require('path');
const socket = require("socket.io");
require('dotenv').config({ path: path.resolve(__dirname, './.env') });


app.use(cors());
app.use(express.json());

//use userRoutes for api calling
app.use("/api/auth",userRoutes);

//for message routing
app.use("/api/messages",messageRoute);

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


//setup socket server
const io = socket(server, {
    cors: {
        origin: "https://yu-chat.herokuapp.com/",
        Credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) =>{
        onlineUsers.set(userId, socket.id);
    });

    //in this case if receiver is also online it emit the message and store in database
    // else store it in the database
    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
        // console.log(data.message);
    });
});
