

const perMemberMealInfo = require("../model/perMemberMealInfo");



///-----------------insert Per Member Meal cost-------------------->

exports.CreateMemberMealInfo = async(req,res)=>{
    
    try{


        const {memberId,perMemberBalance,PerMemberMeal}=req.body;
    
    
    
      const perMember=  await new perMemberMealInfo({
        memberId,
        perMemberBalance,
        PerMemberMeal
            
    }).save();


        res.status(200).json({status:"success",data:perMember})

    
    }catch(error){
    
        res.status(200).json(error)
       
    
    }
    
    }
    