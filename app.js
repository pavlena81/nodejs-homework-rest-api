const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const { DB_Host, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true)

mongoose.connect(DB_Host)
  .then(() => app.listen(PORT))
    .catch(error => {
      console.log(error.message);
      process.exit(1);
    })

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app

//B3SdH7G7KPhnBpVw