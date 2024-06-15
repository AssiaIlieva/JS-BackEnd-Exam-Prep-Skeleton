const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (userData) => {
    // Check if password and rePassowrd match
    if(userData.password !== userData.rePassword){
        throw new Error('Password missmatch')
    };
    // Check if the user already exists
    const user = await User.find({email: userData.email});
    if(user){
        throw new Error('User already exists')
    }
    return User.create(userData);
} 

exports.login = async (email, password) => {
    // Get user from DB
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Invalid email')
    }
    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        throw new Error('Invalid password')
    }

    // Generate token

    // Return token
}