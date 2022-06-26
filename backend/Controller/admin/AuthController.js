
const jwt = require('jsonwebtoken')

const Auth = (req,res) => {
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
        if(err){
            res.send({status:false})
        } else {
            if (decoded) {
                res.send({status:true})
            }
        }
    })
}

module.exports = {Auth}