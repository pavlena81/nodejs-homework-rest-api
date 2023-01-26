const bcrypt = require('bcryptjs');

const { v4: uuidv4 } = require('uuid');

const jwt = require('jsonwebtoken');

require("dotenv").config();

const { User } = require('../models/user');

const { HttpError, ctrlWrapper, sendMail } = require('../helpers');



const { SECRET_KEY, BASE_URL } = process.env;

const gravatar = require('gravatar');``

const register = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError( 409, 'Email in use')
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const verificationToken = uuidv4();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blanck" href="${BASE_URL}/api/auth/verify/${verificationToken}">Cleack verify email<a/>`
    }
    
    await sendMail(verifyEmail);    
         

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

const verify = async(req, res)=> {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if(!user) {
        throw HttpError(404)
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: ""});

    res.json({
        message: "Verify success"
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
    verify: ctrlWrapper(verify),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
}