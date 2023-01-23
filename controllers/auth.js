const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

require("dotenv").config();

const { User } = require('../models/user');

const { HttpError, ctrlWrapper } = require('../helpers');

const { SECRET_KEY } = process.env;

const gravatar = require('gravatar');

const register = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError( 409, 'Email in use')
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, 'Email or password is wrong');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
         throw HttpError(401, 'Email or password is wrong');
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });    
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        name: user.name,
        email: user.email,
    })
}

const getCurrent = async (req, res) => {
    const { email, name } = req.user;

    res.json({
        email,
        name,
    })
}

const logout = async(req, res)=> {
    const { _id } = req.user;    
    await User.findByIdAndUpdate(_id, {token: " "});

    res.json({
        message: "Logout success"
    })
}

const updateSubscription = async (req, res) => {
    
    const { id } = req.user;
    const result = await User.findOneAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404)
  }
    
    res.json(result);
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
}