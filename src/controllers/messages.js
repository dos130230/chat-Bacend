import {ServerError ,ClentError} from "../utils/errorHandling.js"
import dataConveter from "../utils/dataConverter.js"
import path from "path"
import fs from "fs"

const GET = (req,res,next) => {
	try{
		let mes = req.select("messages")

		let meini_Id = req.userId
		let {id} = req.headers
		if(!id) throw new ClentError (400,"Id qo'shib yuborish kirtish kerak!")
		let uni_id = id

		mes = mes.filter( el => {
			el.messageDete = dataConveter(el.messageDete)
			if((el.useridTo == uni_id && el.userId == meini_Id) || (el.useridTo == meini_Id && el.userId == uni_id)){
				return el.person = el.userId ==meini_Id ?"sender" : "receiver"
			}
		})

		return res.json(mes)
	}catch(error){
		return next(error)
	}
}



const POST = (req,res) => {
	try{
		const {useridTo} = (req.body)
		if(!useridTo) throw new ClentError(400,"useridTo qiymat kirtish kerak!")

		let frends = req.select("frends")
		if(!frends[useridTo]) throw new ClentError(404,"Bunday User mavjud emas!")
		let type = "text"
		let {textSend} = req.body

		if(req.file){
			const { originalname, mimetype,  buffer, size} = (req.file)	
			type = mimetype
			const fileName = Date.now() + originalname.replace(/\s/g , '');
			const filePath = path.join(process.cwd(),"files","others",fileName)
			textSend = "/others/" + fileName
			fs.writeFileSync(filePath,buffer)	
		}

		let allMes = req.select("messages")

		if(!frends[req.userId].includes(+useridTo)) (frends[req.userId]).push(+useridTo)
			if(!frends[useridTo].includes(+req.userId)) frends[+useridTo].push(req.userId)

			req.insert("frends",frends)

			let newMess = {
				"messageId" : allMes.length ? allMes[allMes.length-1].messageId+1 :1 ,
				"userId" : req.userId,
				"useridTo" : +useridTo,
				"messageType" : type,
				"messageDete" :new Date(),
				"file" : textSend

			}
			allMes.push(newMess)

			
			req.insert("messages",allMes)

			return res.status(201).json({ messages: "Xabar qo'shildi!" ,data : newMess})
		}catch(error){
			res.send(error.message)
		}
	}



	export default {
		GET,
		POST
	}


