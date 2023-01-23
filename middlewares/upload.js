const multer = require('multer');
const path = require('path');

//const tempFileDir = path.join(__dirname, '../', 'temp');

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../","temp"),
    filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
   
    limits: { fileSize: 2000000},
  
})

const upload = multer({
    storage: storage,
  
});

module.exports = upload;