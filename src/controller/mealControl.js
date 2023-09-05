

// regular meal and balance of a member

const MealControl = require("../model/MealControl");
const Member = require("../model/MemberModel");



exports.RegularMeal = async(req,res)=>{
    
try{
    const {meal,balance,memberId}=req.body;


  const mealControl=  await new MealControl({
    memberId,
    meal,
    balance
}).save();
    res.json({
        mealControl:{
            memberId:mealControl.memberId,
           meal: mealControl.meal,
            balance:mealControl.balance

        }
    })

}catch(error){

    res.status(200).json(error)

}

}



//----------------------->total cost of a member---------------->

exports.perMemberMealCost=async(req,res)=>{

    
    const {mealRate,email} = req.params;

    try{

    const member = await MealControl.findOne({email:email});

    if(member){
        const totalCost = mealRate*(member.meal)
        res.json({'status':"success",data:totalCost})
    }else{

        res.json({'status':"fail"})

    }

    }catch(error){

        res.json("something went wrong")
      
    }
}

//.............. current balance of a member....................>

exports.currentBalance=async(req,res)=>{

    
    const {totalMealCost,email} = req.params;

    try{

    const member = await MealControl.findOne({email:email});

    if(member){
        const currentBalance = (member.balance)-totalMealCost;
        res.json({'status':"success",data:currentBalance})
    }else{

        res.json({'status':"fail"})

    }

    }catch(error){

        res.json("something went wrong")
      
    }
}





///...............................Meal rate.................................>


exports.MealRate=async(req,res)=>{

    const {grantTotalCost} = req.params;
      const totalMeal = await  MealControl.aggregate([      
            {
              $group: {
                _id: null,          
                grantTotalMeal:{
                  $sum: '$meal'  
                }
  
              }
            
            }
      ],(error,data)=>{
  
          if(error){
              console.log(error)
          }else{
              const milRate = parseFloat(grantTotalCost/data[0].grantTotalMeal)     
              res.json({status:"success",data:{milRate,totalMeal:data[0].grantTotalMeal}})
          }
  
      })
  }



///------------------->update member cost by Admin-------------->


exports.updateByAdmin=async(req,res)=>{

    const {id} = req.params;
    const {meal,balance,role} = req.body;
          
    await MealControl.findOneAndUpdate({_id:id},{meal:meal,balance:balance,role:role})


}
