import express from "express"
import cors from "cors"
import  "./db/mongoose.js"



//using user route
import userRouter from "./routes/user.js";




const app = express()
const PORT = 5000;

app.use(express.json())
app.use(cors())


app.use('/user', userRouter)

 


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})



