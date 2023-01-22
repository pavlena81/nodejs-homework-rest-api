const { User } = require('../models/user');
const path = require('path');
const fs = require('fs/promises');

const avatarsDir = path.join(__dirname, "public", "avatars");

const updateAvatar = async (req, res) => {
    const { description } = req.body;
  console.log(req.body);
  const { path: tempUpload, filename } = req.file;
  console.log(req.file);
  const resultUpload = path.join(avatarsDir, filename);
  
  try {
    await fs.rename(tempUpload, resultUpload);
  } catch (err) {
    await fs.unlink(tempUpload);
    return next(err);
  }
  res.json({ description, message: 'Файл успешно загружен', status: 200 });
};

module.exports = updateAvatar;
