
import sha256 from "sha256"
import myJwt  from "../utils/jwd.js"
import path from "path"
import fs from "fs"

const LOGIN = (req,res,next) => {
	try {
		const {username, password} = req.body

		if(! username.trim() || !password.trim() ) throw new Error("username va password kiritish shart!")

		let users = req.select("users")
		let found = users.find( user => user.username == username && user.password == sha256(password))
		if(!found) throw new Error("username yoki password hafli!")

		return res.status(201).json({ messages: "OK LOGIN",token: myJwt.sign({userId : found.userId,agent: req.headers['user-agent']})})

	}catch(error){
		res.send(error.message)
		return next(error)
	}
}


const REGISTER = (req,res,next) => {
	try{
		
		let {username , password} =(req.body)

		if(!password || !username) throw  new Error("Username yoki Password kiritish kerak!")

		const  users = req.select("users")
		const find = users.find(user => user.username==username)

		if(find) throw new Error("Bunday username mavjud!")
		if(!req.file) throw  new Error("File kiritish kerak!")

		const { originalname, mimetype,  buffer, size} = (req.file)

			if(!["image/jpeg","image/jpg","image/png"].includes(mimetype))throw  new Error("Faqat jpg yoki png kiritish kerak!")
			if((size < 1 * 1024 * 1024)) throw new Error("File hajmi 1MB dam oshmasin!")

			const fileName = Date.now() + originalname.replace(/\s/g , '');
			const filePath = path.join(process.cwd(),"files","images",fileName)

			fs.writeFileSync(filePath,buffer)


			let newUser = {
				userId : users.length ? users[users.length-1].userId+1 : 1,
				username,
				password : sha256(password),
				userimg: "/images/" + fileName
			}

			let frends = req.select("frends")
			frends[newUser.userId] = []
			req.insert("frends",frends)


			users.push(newUser)
			req.insert("users",users)
			delete newUser.password


			res.status(200).json({ message : "OK REGISTER" ,data : newUser,token:myJwt.sign({userId:newUser.userid,agent: req.headers['user-agent']})})

	}catch(error){
		res.send(error.message)
		return next(error)
	}
}

export default {
	LOGIN,
	REGISTER
}