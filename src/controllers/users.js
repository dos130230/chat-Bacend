const GET = (req,res) => {
	const users = req.select("users")
	const frends = req.select("frends")
	console.log(req.url)

	if(req.url == "/frendUser"){
		let user = users.filter( user => frends[1].includes(user.userId))
		return res.json(user)
	}else {

		return res.json(users)
	}


}


export default {
	GET
}


