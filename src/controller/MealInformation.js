// const MealInformation = require("../model/MealInformation");



// ///-----------------insert Per Member Meal cost-------------------->

// exports.MealInfoPerMember = async(req,res)=>{
    
//     try{
//         const {PerMemberMealCost,CurrentBalance,memberId}=req.body;
    
    
//       const perMember=  await new MealInformation({
//         memberId,
//         PerMemberMealCost,
//         CurrentBalance
            
//     }).save();
//         res.json({
//             PerMemberMealCost:{
//                 memberId:perMember.memberId,
//                 TotalMealCost: perMember.meal,
//                 balance:perMember.balance,
//                 CurrentBalance:perMember.CurrentBalance
                
    
//             }
//         })
    
//     }catch(error){
    
//         res.status(200).json(error)
    
//     }
    
//     }
    