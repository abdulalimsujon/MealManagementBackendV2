

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
            balance:mealControl.balance,
            date:mealControl.createdAt
            

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
                },
  
                grantTotalBalance:{
                  $sum: '$balance'  
                },
  
              }
            
            }
      ],(error,data)=>{
  
          if(error){
              console.log(error)
          }else{
              const milRate = parseFloat(grantTotalCost/data[0].grantTotalMeal) 
              const existBalance = parseFloat((data[0].grantTotalBalance)-(milRate*data[0].grantTotalMeal))   
              res.json({status:"success",data:{milRate,grandBalace:data[0].grantTotalBalance,totalMeal:data[0].grantTotalMeal,grantExistBalance:existBalance}})
          }
  
      })
  }



///------------------->update member cost by Admin-------------->


exports.updateByAdmin=async(req,res)=>{

    const {id} = req.params;
    const {meal,balance,role} = req.body;
          
    await MealControl.findOneAndUpdate({_id:id},{meal:meal,balance:balance,role:role})


}



  //---------------------->grand total balance-------------------------->

  exports.grandTotal = async(req,res)=>{
    const totalInfo = await  MealControl.aggregate([      
          {
            $group: {
              _id: null,          
              grantTotalMeal:{
                $sum: '$meal'  
              },
              grantTotalBalance:{
                $sum: '$balance'  
              }

            }
          
          }
    ],(error,data)=>{

        if(error){
            console.log(error)
        }else{
         
                
            res.json({status:"success",data:{grandTotalMeal:data[0].grantTotalMeal,grandTotalBalance:data[0].grantTotalBalance}})
        }

    })
}
  //.............................. meal info by phone...................................

  exports.mealInfo=async(req,res)=>{
    const {phone }= req.params;

    try{

      const member = await MealControl.findOne({mobile:phone});

    
      if(member){
          
          res.status(200).json({member})
      }else{
  
          res.json({'status':"fail"})
  
      }
  
      }catch(error){
  
          res.json("something went wrong")
        
      }
  }

  ///-----------------------------meal info by date---------------------->

  exports.mealInfo=async(req,res)=>{
    const {createdAt }= req.params;

    try{

      const member = await MealControl.findOne({createdAt:createdAt});

    
      if(member){
          
          res.status(200).json({member})
      }else{
  
          res.json({'status':"fail"})
  
      }
  
      }catch(error){
  
          res.json("something went wrong")
        
      }
  }


  


