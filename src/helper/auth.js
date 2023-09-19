const bcrypt = require('bcrypt')


exports.hashPassword=(password)=>{
    return new  Promise((resolve,reject)=>{

        bcrypt.genSalt(12,(error,salt)=>{
            if(error){
                reject(error)
            }


            bcrypt.hash(password,salt,(error,hash)=>{
                if(error){
                    reject(error)
                }

                resolve(hash)
            })
        })





    })
}

//compare password

exports.comparePassword = (password,newPassword)=>{
    return bcrypt.compare(password,newPassword);
}

