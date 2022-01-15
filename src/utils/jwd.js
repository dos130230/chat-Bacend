import jwd from "jsonwebtoken"

let TOKEN_KEY = "olma"

export default {
	sign : (data) => jwd.sign(data,TOKEN_KEY),
	verify : (token) => jwd.verify(token,TOKEN_KEY)
}

