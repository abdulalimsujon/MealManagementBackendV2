const { hashPassword } = require("../helper/auth");

const jwt = require("jsonwebtoken");
const Member=require("../model/MemberModel")





//------------------------->registration------------------------->

exports.registration = async(req,res)=>{

    try{
        const {name,email,password,address,role,photo} = req.body;

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
         
            address,
            role,
            photo


        }).save();

         //create token

         const token = jwt.sign({
            _id: member.email
        }, process.env.JWT_SECRATE, { expiresIn: '7d' });


        res.json({
            member:{

                name:member.name,
                email:member.email,
                password: hash,
                meal:member.meal,
                balance:member.balance,
                address:member.address,
                role:member.role,
                photo:member.photo

            },
            token
        })

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
    const {email}= req.body;

    const allMember= await Member.find({});

    res.json({members:allMember})

}

  
  ///---------------------delete user by admin-------------------------->

  exports.deleteMember=async(req,res)=>{

    const {id} = req.params;

    const member= await Member.findByIdAndDelete({_id:id});
    console.log(member)
  }








