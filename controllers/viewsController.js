const getLoginPage = (req,res)=>{
    res.render('login')
}
const getSignupPage = (req, res) =>{
    res.render('signup')
}
module.exports = {
    getLoginPage,
    getSignupPage
}