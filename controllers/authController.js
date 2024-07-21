const User = require('../models/user')
const {hashPassword, comparePasswords} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

//get users
const test = (req, res) =>{
    res.json("test is working")
}

//register user
const registerUser = async (req, res) =>{
    try{
        const {name, email, password} = req.body || {}
        //validate name
        if(!name){
            return res.json({
                error: "name is empty"
            })
        }

        //validate password
        if(!password || password.length < 3){
            return res.json({
                error:"Password not present of password less than 3 characters"
            })
        }

        //email
        const mailExist = await User.findOne({email});
        //const mailExist = false
        if(!email){
            return res.json({
                error:"email is empty"
            })
        }else if(mailExist){
            return res.json({
                error:"Email aready exists"
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })

        return res.json(user)

    } catch(err){
        console.log("catch error",err)
    }
}

//login users
 const loginUser = async (req, res)=>{
    try{
        const {email, password} = req.body || {}

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error:"user not present"
            })
        }

        const checkPasswordIsCorect = await comparePasswords(password, user.password)
        if(checkPasswordIsCorect){
            //assing jwt token
            // return res.json('password matched')
            jwt.sign({email:user.email, name:user.name, id:user._id, random:"im stupid"}, process.env.JWT_SECRET, {}, (err, token)=>{
                if(err) throw err
                return res.cookie('token',token).json(user)
            })
        }else{
            return res.json({
                error:"Incorrect Password"
            })
        }
    }catch(err){
        console.log("login catch error",err)
    }
}

const getProfile = async (req, res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err,user)=>{
            //the user here is object that we set inside the token while logging in
            if(err) throw err
            res.json(user)
        })
    }else{
        res.json(null)
    }
}

const logoutUser = async (req,res)=>{
    try{
       return res.cookie('token', '', {maxAge:0}).json({message:"user logged out", user:{}})
    }catch(err){
        res.status(500).json({error:"error, cannot logout user"})
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}