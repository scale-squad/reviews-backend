const mongoose = require("mongoose");

function connectDB() {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.url, {
      useNewUrlParser: true
    })
    .then(connection => resolve(connection))
    .catch(error => reject(error));
  });
}

function disconnectDB() {
  return new Promise((resolve, reject) => {
    mongoose.disconnect()
    .then(() => resolve())
    .catch(error => reject(error));
  });
}

module.exports = { connectDB, disconnectDB };
