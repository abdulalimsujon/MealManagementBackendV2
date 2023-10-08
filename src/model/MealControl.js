

const mongoose = require('mongoose');




const MealCostSchema = mongoose.Schema({

    _id: {
        type: mongoose.Types.ObjectId, // specify the type as ObjectId
        default: () => new mongoose.Types.ObjectId(), // generate a new ObjectId by default
      },
    meal:{
        type:Number,
        default:0
    },
    balance:{
        type: Number,
    default: 0

      
    },


},{
    versionKey: false ,
 
})


const MealControl = mongoose.model('MealControl',MealCostSchema)

module.exports = MealControl;