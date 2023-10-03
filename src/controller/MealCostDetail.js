


//........................MealDetail......................>

const MealCostDetail = require("../model/MealCostDetail");


exports.MealDetail=async(req,res)=>{
    const {fields} = req.body; 
    //  console.log("==========>",fields)
     
    const mealDetail = await new MealCostDetail({
        
        items:fields
        
    }).save()
    
    

    res.json({
        mealDetail:{

            fields 

         
        }
    })
}

///-------------get total meal cost detail--------------------------->

exports.getMealCostDetail=async(req,res)=>{

    const date = new Date();

let day =parseInt( date.getDate());

console.log(day)

    const mealCostDetail = await  MealCostDetail.find({createDate:day})
    console.log(mealCostDetail)

    const allItems=[]
    let sum = 0;

    for (let i in mealCostDetail){
        const items =mealCostDetail[i].items

        for (let j in items){
            allItems.push(items[j])
            sum=sum+ parseInt(items[j].value)
        }
    }
    
   // console.log(sum)
  

   console.log("===",allItems)
  
      
       res.status(200).json({data:allItems,totalCost:sum})
    

   
} 


