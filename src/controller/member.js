const { hashPassword, comparePassword, LocalStorageSetValue } = require("../helper/auth");

const jwt = require("jsonwebtoken");
const Member=require("../model/MemberModel");






//------------------------->registration------------------------->

exports.registration = async(req,res)=>{

    try{
        const {name,email,password,address,role,photo,mobile} = req.body;

        const existUser = await Member.findOne({ email: email })
        console.log(existUser);
        if (existUser) {
            res.json({ error: "Email is taken" })
        }

        const hash = await hashPassword(password)

       
        const member = await new Member({
            name,
            email,
            password: hash,
            mobile,
            address,
            role,
            photo


        }).save();

         //create token

         const token = jwt.sign({
            _id: member.email
        }, process.env.JWT_SECRATE, { expiresIn: '7d' });

   
        res.status(200).json({


            member:{
                name:member.name,
                email:member.email,
                password: hash,
                meal:member.meal,
                balance:member.balance,
                address:member.address,
                mobile:member.mobile,
                role:member.role,
                photo:member.photo

            },
            token
            
        })

    }catch(error){

        console.log(error)

    }
}
/// ---------------------------->member sign in----------------->

exports.signIn=async(req,res)=>{
    try{

        const {email,password} =req.body;

        const FindMember = await Member.findOne({email:email});

        const compare = comparePassword(FindMember.password,password)

        console.log("dfhsa",FindMember)
        console.log(compare)

        if(FindMember && compare){
     
            res.status(200).json({status:"success",data:FindMember})
        }else{
            res.status(400).json({error:"No member Or Password wrong"});
        }

        


    }catch(error){
        console.log(error)
    }
   
}
///================>update member profile=======================>

exports.UpdateProfile=async(req,res)=>{


    try{

        const email = req.headers.email;

        const {name,password,address,photo}=req.body;

        const hash = await hashPassword(password);

         await Member.findOneAndUpdate({email:email},
            {name:name,
                password:hash,
                address:address,
                photo:photo
            });   

    }catch(error){

        res.json('something went Wrong')

    }

      



}




//--------------------->get all member-------------------------->

exports.Allmember=async(req,res)=>{
  

    const allMember= await Member.find({});
    if(allMember.length==0){
        res.status(400).json({error:"No member"})
        
    }else{

        res.status(200).json({members:allMember})

    }
    

}
///-------------------------->search by mobile---------------->

exports.Search=async(req,res)=>{
   
    const {phone} = req.params;

   const SearchMember=  await Member.find({mobile:phone});
    if(SearchMember.length==0){
        res.status(400).json({error:"No member"})
        
    }else{

        res.status(200).json({member:SearchMember})

    }
    
}



  
  ///---------------------delete user by admin-------------------------->

  exports.deleteMember=async(req,res)=>{
    try{

        const {id} = req.params;

        await Member.findOneAndDelete({_id:id},(error,data)=>{
   
          if(error){
            res.status(400).json({data:error})
          }else{
            console.log(data)
            res.status(200).json({data:data})
          }
   
        });

    }catch(error){
        console.log(error)
    }

   
    
  }







