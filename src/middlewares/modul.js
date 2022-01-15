import path from "path"
import fs from "fs"


export default (req,res,next) => {
	req.select = (fileName) => {
		let file = fs.readFileSync (path.join(process.cwd(),"src","database",fileName+".json"),"utf8")
		file = file ? JSON.parse(file) : []
		return file
	}

	req.insert = (fileName,data) => {
		let file = fs.writeFileSync(path.join(process.cwd(),"src","database",fileName+".json"),JSON.stringify(data,null,4))
		return file
	}

	return next()
}