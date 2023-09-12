


//........................MealDetail......................>

const MealCostDetail = require("../model/MealCostDetail");


exports.MealDetail=async(req,res)=>{
    const {fields} = req.body; 
     console.log("==========>",fields)
     
    const mealDetail = await new MealCostDetail({
        
        items:fields
        
    }).save()
    
    

    res.json({
        mealDetail:{

            fields 

         
        }
    })
}

///-------------get total meal cost--------------------------->

exports.getMealCostDetail=async(req,res)=>{

    const mealCostDetail = await  MealCostDetail.find({})
    
    let total=0;

    for (let i in mealCostDetail){

        const items=mealCostDetail[i].items;
    
        
        for(let j in items){
           
            total= total+ parseInt(items[j].value)
        }

    }
    if(mealCostDetail.length>=0){
        res.status(200).json({regularMealCostTotal:total})
    }

   
} 


