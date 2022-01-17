import myJwt from "../utils/jwd.js"
import {ServerError ,ClentError} from "../utils/errorHandling.js"

 export default (req,res,next) => {
	try {
		const {token} = req.headers

		if (!token) {
			throw new ClentError(400,"Token kiritish kerak!")
		}
		const {userId,agent} = myJwt.verify(token)


		// if(req.headers['user-agent']!== agent) {
		// 	throw new Error("Rasvo token!")
		// }
		req.userId = userId

		return next()

	}catch (error){
		return next(error)
	}

}

