const GET = (req,res) => {
	try{
		const users = req.select("users")
		const frends = req.select("frends")

		if(req.url == "/frendUser"){
			let user = users.filter( user => frends[req.userId].includes(user.userId))
			return res.json(user)

		}else {
			let men = users.filter (user => {
				 delete user.password
				return (user.userId!=req.userId) 
			})
			
			return res.json(men)
		}
		
	}catch(error){
		return next(error)
	}
}


export default {
	GET
}


