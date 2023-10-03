

// ------create regular meal and balance of a member------->

const Member = require("../model/MemberModel");
const MealControl = require("../model/MealControl");



exports.RegularMeal = async(req,res)=>{

  const date = new Date();

  let day =parseInt( date.getDate());
    
try{
    const {meal,balance,memberId,count}=req.body;


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
            date:mealControl.date
            

        }
    })

}catch(error){

    res.status(200).json(error)

}

}


///------------------ get all regular meal of each member--------->

exports.MealInformation=async(req,res)=>{
    

  const {mealRate} = req.params;

  console.log(mealRate)

      const find = await Member.find({})
    //  console.log("=======",find[0]._id)

    

   

          await  MealControl.aggregate([      
        {
            $group: {
            _id:"$memberId",
                totalMeal:{
                    $sum: "$meal"
     
                 },
                 totalBalance:{
                    $sum: "$balance"

                 }
            }
          
        } 
        
        
      ]
      ,async(error,data)=>{

  
          if(error){
              console.log(error)
          }else{      
            
          
                  const EachPersonMealInfo=[];
               
             for (let i in data){
               
                   
                      
                const member= await Member.find({ _id: data[i]._id})

                var MemberInfo= {};

                        for (let j in member){

                          MemberInfo["name"] = member[j]?.name;
                          MemberInfo["email"] = member[j]?.email;
                          MemberInfo["totalMeal"] = data[i]?.totalMeal;
                          MemberInfo["totalBalance"] =data[i]?.totalBalance;
                          MemberInfo["ExistBalance"] = (data[i]?.totalBalance)-(data[i]?.totalMeal * mealRate);
                           
                         
                        }

                        EachPersonMealInfo.push(MemberInfo)                    
                
             }    

          
            res.json({status:"success",EachPersonMealInfo})           
             
          }
  
      }


      )

  }

 
//----------------------->total cost of a member---------------->

exports.perMemberMealCost=async(req,res)=>{

    
    const {mealRate,email} = req.params;

    try{

    const member = await MealControl.findOne({email:email});

    if(member){
        const totalCost = mealRate*(member.meal)
        res.json({'status':"success",totalMealCost:totalCost,MemberTotalMeal: member.meal })
    }else{

        res.json({'status':"fail"}) 

    }

    }catch(error){

        res.json("something went wrong")
      
    }
}



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

// ------------------>edit meal and balance---------------------------->

exports.editMeal=async(req,res)=>{

  const {id} = req.params;
  const {editMeal,editBalance} = req.body;

  MealControl.update({memberId:id},
      {
        meal:editMeal,
        balance:editBalance
      },(error,data)=>{
      if(error){
          res.status(400).json({status:"fail",data:error})
          return false;
      }else{
        console.log(data)
          res.status(200).json({status:"success",data})
          return true;
      }
  })
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


  


