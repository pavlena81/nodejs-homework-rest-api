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
        html: `<a target="_blanck" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email<a/>`
    }
    
    await sendMail(verifyEmail);    
         

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        message: 'Verification email send'
    })
}

const verified = async (req, res) => {    
    const { verificationToken } = req.params;    
    
    const user = await User.findOne({ verificationToken });    
    
    if(!user) {
        res.status(404).json({ message: 'User Not Found' })
    }
    console.log(user);
         await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: " "});
    console.log(User);
    
   
    res.json({
        message: 'Verification successful'
    })
}

const resendEmailVerify = async (req, res) => {
    const { email } = req.body;
    
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400).json({"message": "missing required field email or check email"})
    }
   
    if (user.verify) {
        res.status(400).json({"message": "Verification has already been passed"}) 
    }

     const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blanck" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email<a/>`
    }
    
    await sendMail(verifyEmail);   

    res.status(201).json({message: 'Verification email resend'})
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, 'Email or password is wrong');
    }

    if (!user.verify) {
        throw HttpError(401, 'Your Email has not been verified. Please click on verify email');
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
    verified: ctrlWrapper(verified),
    resendEmailVerify: ctrlWrapper(resendEmailVerify),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
}