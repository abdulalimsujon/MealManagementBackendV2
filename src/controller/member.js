const { hashPassword, comparePassword} = require("../helper/auth");

const jwt = require("jsonwebtoken");
const Member=require("../model/MemberModel");
const bcrypt = require('bcrypt');






//------------------------->registration------------------------->

exports.registration = async(req,res)=>{

    try{
        const {name,email,password,address,role,photo,mobile,MealInfo} = req.body;

        if(!name){
            return res.json({error:"name is empty"})
        }
        if(!email){
            return res.json({error:"email is empty"})
        }

        if(!password && password.length<6){
            return res.json({error:"Atleast 6 digit is required"})
        }
        if(!mobile){
        
            return res.json('mobile is required')

        }

        const existUser = await Member.findOne({ email: email })
       // console.log(existUser);
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
            email: member.email
        }, process.env.JWT_SECRATE, { expiresIn: '7d' });

   
        res.status(200).json({ status:"success",


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



        if(!email){
            return res.json({error:"Email or Password is empty"})
        }
        if (!password && password.length < 6) {
            return res.json({ error: 'password must be 6 characters' })
        }

        const FindMember = await Member.findOne({email:email});

       

        // 4. compare password
        const match = await comparePassword(password, FindMember.password);
        if (!match) {
          return res.json({ error: "Invalid email or password" });
        }

        if(FindMember){

            let paylaod = {exp: Math.floor(Date.now()/1000)+(24*60*60),FindMember}

            let token = jwt.sign(paylaod,process.env.JWT_SECRATE)
     
          return   res.status(200).json({status:"success",data:FindMember,token:token})
        }else{
            
          return res.json({error:"Not member or Wrong Password"})

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

        console.log("+++",allMember[0]._id)


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







