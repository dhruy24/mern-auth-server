const mongoose = require('mongoose')
const {Schema} = mongoose

const useSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String
})

//"User":-creates a new table/cluster named User.
//useSchema:- this schema gets assigned to the table/cluster
const UserModel = mongoose.model('User',useSchema)

module.exports = UserModel