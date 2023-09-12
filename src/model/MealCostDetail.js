const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MealCostSchema = mongoose.Schema({

    items:{
        type: Schema.Types.Mixed,
        default: {},
    }
    ,
    grandTotalCost:{
        type:Number,
        default:0
    }


},{
    versionKey: false ,
    timeStamps:true
})


const MealCostDetail = mongoose.model('MealDetail',MealCostSchema)

module.exports = MealCostDetail;