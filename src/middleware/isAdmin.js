const Member = require("../model/MemberModel")

exports.isAdmin=async(req,res,next)=>{
try{
    
    const id = req.member._id
    console.log(id)

  const member=  Member.findbyId(id);

  if(member.role !== 1){
    res.json('User is not authorized');

  }else{

    next()

  }


}catch(error){
    res.json({error:error})
}
}