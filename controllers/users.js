const Jimp = require("jimp");
const { User } = require('../models/user');
const path = require('path');
const fs = require('fs/promises');

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  //   const { description } = req.body;
  // console.log(req.body);
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  console.log(req.file);
  Jimp.read(tempUpload)
  .then(avatar => {
    return avatar
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write(tempUpload); // save
  })
  .catch(err => {
    next (409, err);
  });
  
  const newImgName = `${_id}_${originalname}`
  const resultUpload = path.join(avatarsDir, newImgName);
  await fs.rename(tempUpload, resultUpload);
  console.log(tempUpload);
  console.log(resultUpload);
  const avatarURL = path.join('avatars', newImgName);
  
  try {    
    await User.findByIdAndUpdate( _id, { avatarURL });
   
   }
  catch (err) {
     await fs.unlink(tempUpload);
    next(err);
  }
 res.json({ message: 'Файл успешно загружен', avatarURL }); 
  
};

module.exports = updateAvatar;
