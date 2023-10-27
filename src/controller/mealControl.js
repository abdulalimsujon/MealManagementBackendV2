 

// ------create regular meal and balance of a member------->

const MealControl = require("../model/MealControl");
const Member = require("../model/MemberModel");





exports.RegularMeal = async(req,res)=>{
    
  try{
      const {meal,balance,_id,email}=req.body;


      // console.log(meal,balance,_id)

      
    const mealControl=  await new MealControl({
      _id,
      email,
      meal:meal,
      balance:balance
    
      
  }).save();
      res.json({
          mealControl:{
             "id":mealControl._id,
             meal: mealControl.meal,
              balance:mealControl.balance,
          
              
  
          }
      })
  
  }catch(error){
  
      res.status(200).json(error)
  
  }
  
  }

  ///--------------------- get meal info by id----------------------------------->

  exports.getMeal = async(req,res)=>{
    const {id} = req.params;
    console.log(id)

   const  info =await MealControl.findOne({_id:id});

   res.status(200).json({status:"success",data:info})
  }

 

///------------------ get all regular meal of each member--------->

exports.MealInformation=async(req,res)=>{
    

  const {mealRate} = req.params;

    //  console.log("=======",find[0]._id)

          await  MealControl.aggregate([      
        {
            $group: {
            _id:"$_id",
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
                          MemberInfo["Id"] = member[j]?._id;
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

            // console.log("cost ==>",grantTotalCost)
           //  console.log("meal ==>",data[0].grantTotalMeal)
        
              const milRate = parseFloat(grantTotalCost/data[0]?.grantTotalMeal).toFixed(2) ;

              console.log(milRate)
              const existBalance = parseFloat((data[0]?.grantTotalBalance)-(milRate*data[0]?.grantTotalMeal)).toFixed(2);
              
              res.json({status:"success",data:{milRate,grandBalace:data[0]?.grantTotalBalance,totalMeal:data[0]?.grantTotalMeal  ,grantExistBalance:existBalance}})
          }
  
      })
  }



// ------------------>update meal and balance---------------------------->

exports.updateMeal=async(req,res)=>{

  const {value1} = req.params;
  const {meal,balance} = req.body;
  console.log(meal)
  console.log(value1)

  MealControl.update({_id:value1},
      {
        meal,
        balance
      },(error,data)=>{
      if(error){
          res.status(400).json({status:"fail",data:error})
          return false;
      }else{
        //console.log(data)
          res.status(200).json({status:"success",data})
         
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
 

 
  
