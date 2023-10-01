const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const MealInformationSchema= mongoose.Schema({
    

    memberId: {
        type: ObjectId,
        ref:  'Member',
        required: true,
    }
    ,
    perMemberBalance:{
        type:Number,
        default:0
    },
    PerMemberMeal:{
        type:Number,
        default:0

    }


},{
    versionKey: false ,
    timeStamps:true
})


const perMemberMealInfo = mongoose.model('perMemberMealInfo',MealInformationSchema)

module.exports =perMemberMealInfo;