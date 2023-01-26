const express = require('express');
const sgMail = require('@sendgrid/mail');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

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

//////////////////////////////////////////////////
// const email = {
//   to: 'manero5316@minterp.com',
//   from: 'pavlena@ukr.net', 
//   subject: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>verify email</strong>',
// };

// sgMail.send(email)
//   .then(() => {console.log("email send success")}, error => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   });

// ///////////////////////////////////////////////
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err,req, res, next) => {
  res.status(500).json({ message: err.message })
})


module.exports = app

//B3SdH7G7KPhnBpVw