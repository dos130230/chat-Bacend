import Joi from "joi"


let regSchema = Joi.object({
	username: Joi.string().max(30).alphanum().required(),
	password : Joi.string().min(5).max(15).pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")).required()
})

const registerValidator = (req,res,next) => {
	try{

		const {value,error} = regSchema.validate(req.body)
		if (error) throw new Error(error.message)

			return next()

	}catch(error){
		res.send(error.message)
		return next()

	}


}

export default  {
	registerValidator
}