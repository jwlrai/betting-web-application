const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name:String,
    address:String,
    email:String,
    phone:Number,
    fund:Number,
    password:String,
    salt:String,
    active:String,
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'groups'
    }
});

module.exports = mongoose.model('users',usersSchema); 