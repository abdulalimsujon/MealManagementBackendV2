const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const date = new Date();

let day =parseInt( date.getDate());


const MealControlSchema = mongoose.Schema({
    memberId: {

        type: ObjectId,
        ref:  'Member',
        required: true,
    },
    meal:{
        type:Number,
        default:0
    },
    balance:{
        type:Number,
        default:0
    },
    date:{
        type:Number,
        default: day 
    },


},{
    versionKey: false ,
    timeStamps:true
})


const MealControl = mongoose.model('MealDetail',MealControlSchema)

module.exports = MealControl;