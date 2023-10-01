const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;


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
    createDate:{type:Date,default:Date.now()},


},{
    versionKey: false ,
    timeStamps:true
})


const MealControl = mongoose.model('MealControl',MealControlSchema)

module.exports = MealControl;