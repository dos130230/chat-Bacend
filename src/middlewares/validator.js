import Joi from "joi"
import {ServerError ,ClentError} from "../utils/errorHandling.js"

let regSchema = Joi.object({
	username: Joi.string().max(30).alphanum().required(),
	password : Joi.string().min(5).max(15).pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")).required()
})

const registerValidator = (req,res,next) => {
	try{
		const {value,error} = regSchema.validate(req.body)
		if (error) throw new ClentError(400,error.message)

		return next()

	}catch(error){
		return next()
	}
}

export default  {
	registerValidator
}