


//........................MealDetail......................>

const MealDetail = require("../model/MealDetail");
const Member = require("../model/MemberModel");

exports.MealDetail=async(req,res)=>{
    const {grantTotalMeal,grantBalance,grantCurrentBalance,grantTotalCost} = req.body;

    const mealDetail = await new MealDetail({
   
        grantTotalCost
     
        
    }).save()

    res.json({
        mealDetail:{

       
            grantTotalCost:mealDetail.grantTotalCost,
         
          
        }
    })
}

