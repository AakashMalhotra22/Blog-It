const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const UserSchema = new Schema({
    name:{type: String, required: true, min: 3},
    photo:{type:String},
    email:{type: String, required: true, unique: true},
    password:{type: String , required: true},
    likes: {type: Number, default: 0},
});

const UserModel = model('User',UserSchema);
module.exports = UserModel;