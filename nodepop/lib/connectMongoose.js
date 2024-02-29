const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
  console.log('MongoDB connection error: ', err);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected in', mongoose.connection.name);
});

mongoose.connect('mongodb://127.0.0.1:27017/nodepop')

module.exports = mongoose.connection;