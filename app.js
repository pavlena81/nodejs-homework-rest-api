const express = require('express');

const logger = require('morgan');
const cors = require('cors');
const fs = require('fs/promises');

const multer = require('multer');
const path = require('path');

const dotenv = require('dotenv')
dotenv.config();

const app = express();



const authRouter = require('./routes/api/auth')
const contactsRouter = require('./routes/api/contacts')



const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/auth', authRouter)
app.use('/api/contacts', contactsRouter)
// /////////////////////////////////////////////////
const storage = multer.diskStorage({
  destination: path.join(__dirname, "temp"),
    filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
   
    limits: { fileSize: 2000000},
  
})
//////middleware
const upload = multer({
  storage: storage,
  // limits: { fileSize: 2000},
  // fileFilter: (req, file, cb) => {
  //      if (file.mimetype.includes('images')) {
  //       cb(null, true)
  //       return
  //   } 
  //    cb(null, false)
  // },
})
app.get("/api/auth", (req, res) => {
  res.json(users);
})  

const avatarsDir = path.join(__dirname, "public","avatars");

app.post('/upload', upload.single('avatar'), async (req, res, next) => {
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
});





// ///////////////////////////////////////////////
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err,req, res, next) => {
  res.status(500).json({ message: err.message })
})








// upload.fields([{name: "avatar", maxCount: 1}])
// upload.array("avatar", 8)



// app.post("/api/upload", upload.single('avatar'), async (req, res) => {
//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.join(avatarsDir, filename);
//   await fs.rename(tempUpload, resultUpload);
//   const avatar = path.join("avatars", filename);
//   console.log(tempUpload);
//   console.log(resultUpload);
//   //console.log(req.file);
// })






module.exports = app

//B3SdH7G7KPhnBpVw