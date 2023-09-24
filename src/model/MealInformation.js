const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MealInformationSchema= mongoose.Schema({

    memberId: {
        type: ObjectId,
        ref:  'Member',
        required: true,
    }
    ,
    perMemberMealCost:{
        type:Number,
        default:0
    },
    currentBalance:{
        type:Number,
        default:0

    }


},{
    versionKey: false ,
    timeStamps:true
})


const MealInformation = mongoose.model('MealInformation',MealInformationSchema)

module.exports = MealInformation;