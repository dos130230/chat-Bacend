import express from "express"
import cors from "cors"
import path from "path"
import fs from "fs"


const PORT = process.env.PORT || 5000
const app = express()
import {ServerError ,ClentError} from "./utils/errorHandling.js"

app.use( express.json() )
app.use( cors())

// loading utils
import timeConverter from "./utils/dataConverter.js"


// loading model json read and write
import model from "./middlewares/modul.js"
app.use(model)

// router loading 
import userRouter from "./routes/users.js"
app.use("/users",userRouter)

import messageRouter from "./routes/messages.js"
app.use("/messages",messageRouter)

import authRouter from "./routes/auth.js"
app.use("/auth",authRouter)


app.use( (error,req,res,next) => {
	if([400,401,403,413,415].includes(error.status)) return res.status(error.status).send(error)

		fs.appendFileSync(
			path.join(process.cwd(), 'log.txt'),
			`${timeConverter(new Date())}  ${req.method}  ${req.url}  "${error.message}"\n`
			)

	return res.status(500).send(new ServerError(""))
})



app.listen(PORT,()=> console.log("Server is runnin http://localhost:"+PORT))