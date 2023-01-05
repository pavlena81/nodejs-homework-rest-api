const mongoose = require('mongoose');

const app = require('./app')

const { DB_Host, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true)


mongoose.connect(DB_Host)
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
    .catch(error => {
      console.log(`Server not running. Error message: ${err.message}`);
      process.exit(1);
    })