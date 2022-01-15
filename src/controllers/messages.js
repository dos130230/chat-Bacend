const GET = (req,res) => {
	let mes = req.select("messages")

	let meini_Id = 1
	let uni_id = 2

	mes = mes.filter( el => {
		if((el.useridTo == uni_id && el.userId == meini_Id) || (el.useridTo == meini_Id && el.userId == uni_id)){
			return el.person = el.userId ==meini_Id ?"me" : "you"
		}
	})

	res.json(mes)
}





const POST = (req,res) => {
	try{
		const {useridTo} = (req.body)
		if(!useridTo) throw new Error("useridTo kirtish kerak!")

	const { originalname, mimetype,  buffer, size} = (req.file)	
	console.log(mimetype)

	}catch(error){
		res.send(error.message)
	}
}



export default {
	GET,
	POST
}


