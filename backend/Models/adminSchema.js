const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    username:{
        type: String,
        require:true,
        unique: true,
    },
    password: {
        type: String,
        require:true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    verified_acc: {
        type: Boolean,
        require: true,
        default: false
    }
}, { timestamps: true });
adminSchema.pre('save', async function (next){
    let {password} =this;
    const saltRound = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, saltRound);
    next();
})
const adminModel = mongoose.model("User", adminSchema)
module.exports = adminModel;