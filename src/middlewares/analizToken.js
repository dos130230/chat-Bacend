import myJwt from "../utils/jwd.js"

 export default (req,res,next) => {
	try {

		const {token} = req.headers

		if (!token) {
			throw new Error ("token kiritish kerak!")
		}
		const {userId,agent} = myJwt.verify(token)
		console.log(userId,agent)


		if(req.headers['user-agent']!== agent) {
			throw new Error("Rasvo token!")
		}
		req.userId = userId

		return next()

	}catch (error){
		if(error.message=="invalid signature"){
			return res.status(404).send(error)
		}
		res.send(error.message)
		return next(error)
	}

}

