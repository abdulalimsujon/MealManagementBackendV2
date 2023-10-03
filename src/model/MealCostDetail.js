const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const date = new Date();

let day = date.getDate();

const MealCostSchema = mongoose.Schema({

    items:{
        type: Schema.Types.Mixed,
        default: {},
    }
    ,
    grandTotalCost:{
        type:Number,
        default:0
    },
    createDate:{
        type: Number,
    default: day,

      
    },


},{
    versionKey: false ,
 
})


const MealCostDetail = mongoose.model('MealControl',MealCostSchema)

module.exports = MealCostDetail;