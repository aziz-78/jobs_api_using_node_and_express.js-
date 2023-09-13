const register = (req,res) =>{
    res.status(200).send('register user')
}
const login=(req,res)=>{
    res.status(200).send("login")
}

module.exports = {register,login}