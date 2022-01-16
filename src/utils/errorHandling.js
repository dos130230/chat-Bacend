import http from "http"

export class ServerError extends Error{
	constructor (message) {
		super()
		this.status = 500
		this.message = "Internal Error :" +message
	}
}


export class ClentError extends Error{
	constructor (status,message) {
		super()
		this.status = status
		this.message = http.STATUS_CODES[status]+": "+message
	}
}

