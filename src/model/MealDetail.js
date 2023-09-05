const mongoose = require('mongoose');


const MealCostSchema = mongoose.Schema({

    grantTotalCost:{
        type:Number,
        default:0,
        trim:true
    }
},{
    versionKey: false ,
    timeStamps:true
})


const MealDetail = mongoose.model('MealDetail',MealCostSchema)

module.exports = MealDetail;