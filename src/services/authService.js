const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const SECRET = 'ACDC4kiss3Quinn00GynsAndRoses44Scorpions'

exports.register = async (userData) => {
    // Check if password and rePassowrd match
    if(userData.password !== userData.rePassword){
        throw new Error('Password missmatch')
    };
    // Check if the user already exists
    const user = await User.findOne({email: userData.email});
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
    // Generate token - check which properties are needed - names
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }
    const token = await jwt.sign(payload, SECRET, {expiresIn: '2h'});
    // Return token
    return token;
}