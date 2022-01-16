const GET = (req,res) => {
	try{
		const users = req.select("users")
		const frends = req.select("frends")

		if(req.url == "/frendUser"){
			let user = users.filter( user => frends[req.userId].includes(user.userId))
			return res.json(user)

		}else return res.json(users)
		
	}catch(error){
		return next(error)
	}
}


export default {
	GET
}


