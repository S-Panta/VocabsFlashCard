const User = require('../models/userModel')

const getLoginPage = (req,res)=>{
    res.send("The login page  is on")
}
const authenticateUser = (req,res)=>{
    const{email,password} = req.body
    res.send("You're logged in")
}
const getSignUpPage = (req,res)=>{
    res.send("You're  in signup page")
}
const registerNewUser = async(req,res)=>{
    const{email,password} = req.body
    try {
        const user = await User.create({'email':email,'password':password})
        res.status('201')
    }
    catch(err) {
        console.log(err)
    }
}
module.exports = { getLoginPage,authenticateUser,getSignUpPage,registerNewUser }