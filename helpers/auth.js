const bcrypt = require("bcrypt")

const hashPassword = (password) =>{
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(12,(err, salt)=>{
            if(err){
                console.log("errr 9999999999999999999999999999")
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash)=>{
                if(err){
                    console.log("errr 88888888888888888888888888")
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

module.exports = {
    hashPassword,
    comparePasswords
}