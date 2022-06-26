const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminModel = require('../../Models/adminSchema');

const signup = (req,res) => {
    let {username, email, password} = req.body 
    const signup = new adminModel({ username, email, password })
    signup.save((err) => {
        if (!err) { 
            res.json({message: "Signed up successfully", status: true})
        } else if (err) {
            if (err.keyPattern.email == 1) {
                res.json({message: "Email already existed", status: false})
            } else if(err.keyPattern.username == 1) {
                res.json({message: "Username already taken", status: false})
            } else {
                res.json({message: err, status: false})
            }
        }
    })
};

const signin = (req,res) => {
    let loginContent = req.body;
    adminModel.findOne({email:loginContent.email}, async (err,result)=>{
        if (err) {
            res.json({message: 'Network Error', status: false, err})
        } else if (result) {
            let email = result.email
            let validPassword = await bcrypt.compare(loginContent.password, result.password)
            if(validPassword){
                jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "2h", issuer: "localhost:3000"}, (err, token)=>{
                    if(err){
                        {err.message=="jwt expired"? res.json({message: "Session timed out, kindly login again", status: false}) : null;}
                    }else {
                        res.json({message:"Login Succesfully" ,token, status: true})
                    }
            })
            } else {
                res.json({message: "Incorrect Password", status: false})
            }
        }  else if (result==null) {
            res.json({message: "Email not registered", success:false})
        } 
    })
}
module.exports={ signup, signin }