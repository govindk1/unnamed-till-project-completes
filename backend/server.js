import express from "express"
import cors from "cors"
import  "./db/mongoose.js"



//using user route
import userRouter from "./routes/user.js";


//using order router 
import orderRouter from "./routes/order.js"

const app = express()
const PORT = 5000;
app.use(express.static('uploads'))
app.use(express.json())
app.use(cors())


app.use('/user', userRouter)
app.use('/userOrder', orderRouter)
 


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})



