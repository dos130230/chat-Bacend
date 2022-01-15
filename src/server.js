import express from "express"
const PORT = process.env.PORT || 5000
const app = express()



// loading model json read and write
import model from "./middlewares/modul.js"
app.use(model)

// router loading 
import userRouter from "./routes/users.js"
app.use("/users",userRouter)

import messageRouter from "./routes/messages.js"
app.use("/messages",messageRouter)



app.listen(PORT,()=> console.log("Server is runnin http://localhost:"+PORT))