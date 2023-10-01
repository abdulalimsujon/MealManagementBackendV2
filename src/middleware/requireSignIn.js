
const jwt = require('jsonwebtoken');


exports.requireSignIn =(req,res,next)=>{
    try{

        const token = req.headers.token;
        console.log(token)
        const decode = jwt.verify(token,process.env.JWT_SECRATE)

        req.member = decode;

        next()

    }catch(error){

        console.log("dgjfksh==>",error)

        res.status(400).json("dhfsjk")

    }
}