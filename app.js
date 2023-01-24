const express = require('express');

const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

const app = express();

const authRouter = require('./routes/api/auth')
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/auth', authRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

// upload.fields([{name: "avatar", maxCount: 1}])
// upload.array("avatar", 8)


// app.post('/upload', upload.single('avatar'), async (req, res, next) => {
//   // const { description } = req.body;
//   // console.log(req.body);
//   // const { path: tempUpload, filename } = req.file;
//   // console.log(req.file);
//   // const resultUpload = path.join(avatarsDir, filename);
  
//   // try {
//   //   await fs.rename(tempUpload, resultUpload);
//   // } catch (err) {
//   //   await fs.unlink(tempUpload);
//   //   return next(err);
//   // }
//   // res.json({ description, message: 'Файл успешно загружен', status: 200 });
// });

// ///////////////////////////////////////////////
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err,req, res, next) => {
  res.status(500).json({ message: err.message })
})


module.exports = app

//B3SdH7G7KPhnBpVw