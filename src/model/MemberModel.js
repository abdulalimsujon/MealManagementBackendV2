const mongoose = require('mongoose');


const MemberSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{

        type:String,
        required:true,
        unique:true,
        trim:true

    },
    password:{
        type:String,
        required:true,
        trim:true
    },
   
    address:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:Number,
        default:0
    },
    mobile:{
        type:Number,

    },
    photo: {
            data: Buffer,
            contentType: String,
        }

},{
    versionKey: false ,
    timeStamps:true
})


const Member = mongoose.model('Member',MemberSchema)

module.exports = Member;