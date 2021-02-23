import express from "express"
import cors from "cors"
import  "./db/mongoose.js"
import { createServer } from "http";
import { Server } from "socket.io";
import events from "events"

//using user route
import userRouter from "./routes/user.js";


//using order router 
import orderRouter from "./routes/order.js"


const PORT = 5000;

//configuring app
const app = express()
app.use(express.static('uploads'))
app.use(express.json())
app.use(cors())


//setting up route
app.use('/user', userRouter)
app.use('/userOrder', orderRouter)


//socket.io work
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin:"http://localhost:3000",
        method:["GET", "POST"],
        
    }
})
const eventEmitter = new events.EventEmitter()
app.set('eventEmitter', eventEmitter)   
 

httpServer.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})


io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    // console.log('new client connected');
    
    // socket.emit('message', {message:"hi"});

    // socket.on("hi", (socket) => {
    //     console.log("hi")
    // })
});

eventEmitter.on("order_update", (message) => {
    io.emit("order_update", null)
})







