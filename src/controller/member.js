const { hashPassword, comparePassword} = require("../helper/auth");

const jwt = require("jsonwebtoken");
const Member=require("../model/MemberModel");
const bcrypt = require('bcrypt');
const MealControl = require("../model/MealControl");




//------------------------->registration------------------------->

exports.registration = async(req,res)=>{

    try{
        const {name,email,password,address,role,mobile} = req.body;

        const img ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAo5JREFUOE991EvoVlUUBfDf33yk+aoUfJSCSWiIFkphJD0Qk8gsGmgQKb4w8ZGog6yECAt1UJmTFDInDRIHiSRIJD5SwhI0DDHKgVBgkopgaFqxZH9y+fvhhcv3nbvPWXvvtdbZHW59uuAePIRH8DDG4BqON96fcAnXmxAdjUX+34n7sRLPYG+9h9ANT2BSJTmAz/ALLrdwWoD57YuXMQ/b8GkjWVf816imF2ZjET7CdlzM/hZgT7yC5ZiO3yqWiu/FkAI7U23+XfHB2FL7V+BqAMPZSHyOVxtgd+N5ZGN4Oo9/8AV24a/qYBC+wjvYE8CBWIsfq81864/5eBSrcBp34AHMxVC8XtV2L26zfi2Hn6yyH6yMPTAZc4rTzj5IsndxDu9VMPwvTncBXNZQNvF+WI3wtamNraL2Y7XnuYrfleowLIBb8SV2V3AANuNj7GsDmDPD8S1GVDx0jMMnCf6Aafijgu1aauKGkinF5YuNwH04HMBjmNoAzIFnS7W0FHVzS/Kk3Rh/Hb4rD7Yw8/1QAHdiI75pZOuNN/AU1uAkYu5RmFFJ3m7sj/Ui6u4AflieaimWYEgOlwFNlfsRe0ysq/gWYu68qT4X4KX4OICzio+0GQMPw8wiOetQ8nNVmCExuhJ+X+DRILZJYacCmMmyHgfxe9noV2wo67QR+gZAWg4lOXsW70esAIab8XVbUsEHZZl2QM1vGRDp7s2yXir+ujUc+tTIyvxbWpVevQ1izkXxWCUXI+MrwDenTf5H2UybiJC7nXkX0Cv4t8AjWMRJdY9jAU60wDoDZh11F2IJduBoiXKhkudaxh6h5oW6mplSN5/mxG59TAUT8HRxOxYxe6r8s6bSkbLSqc60/A9RX4qkRAR+rgAAAABJRU5ErkJggg=="


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
            photo:img

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

// ---------------------------->get profiile data--------------->

exports.getProfileData=async(req,res)=>{

    const {email }= req.params;


    const memberProfile = await Member.findOne({email:email});

    if(memberProfile){
        res.status(200).json({status:"success",data:memberProfile})
    }else{
        res.status(400).json({status:"fail",error:"fail"})
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

        const {email} = req.params;

        const {name,address,photo,mobile}=req.body;

        const data =  await Member.findOneAndUpdate({email:email},
            {
                name:name,
                address:address,
                mobile:mobile,
                photo:photo

            }
        ) 
         

        if(data){
            res.status(200).json({status:"success",data})
        }
    }catch(error){
    
        res.json('something went Wrong')
        return true;

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


      await Member.aggregate([
        {
          $lookup: {
            from: "mealcontrols",
            localField: "email",
            foreignField: "email",
            as: "MealInfo",
          },
        }
      
      ],function async(err,data){
        for (let i in data){

            
          if((data[i].mobile)==phone){

            res.status(200).json({data:data[i]})
          

          }
 }

      

      })
      

      




   
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






