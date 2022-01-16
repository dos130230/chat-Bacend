import jwd from "jsonwebtoken"
import {ServerError ,ClentError} from "../utils/errorHandling.js"

let TOKEN_KEY = "olma"

export default {
	sign : (data) => {
		try{
			return	jwd.sign(data,TOKEN_KEY)
		}catch(error){
			throw new ServerError(error.message)
		}
	},
	verify : (token) => {
		try{
			return 	jwd.verify(token,TOKEN_KEY)
		}catch(error){
			throw new ClentError(401,error.message)
		}
	}
}

