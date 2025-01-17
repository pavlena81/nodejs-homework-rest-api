const Jimp = require("jimp");
const { User } = require('../models/user');
const { ctrlWrapper } = require('../helpers');

const path = require('path');
const fs = require('fs/promises');

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res, next) => {  
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  
  const avatar = await Jimp.read(tempUpload);

   avatar.resize(250, 250)
      .quality(60) 
      .write(tempUpload); 
  const newImgName = `${_id}_${originalname}`;
  try {
  
  const resultUpload = path.join(avatarsDir, newImgName);
   
  await fs.rename(tempUpload, resultUpload);
  
  
  const avatarURL = path.join('avatars', newImgName);  
  
  await User.findByIdAndUpdate(_id, {avatarURL});  
    
  res.json({avatarURL}); 
    
  } catch {     
    next(500);
  }
     
 
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
