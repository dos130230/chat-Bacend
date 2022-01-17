import path from "path"


const GET = (req,res) => {
	try{
		let {fileName} = req.params
		return res.download(path.join(process.cwd(),"files","others",fileName))
		
	}catch(error){
		return next(error)
	}
}


export default {
	GET
}


