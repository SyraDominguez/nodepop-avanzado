require('dotenv').config();
console.log('DATABASE_URI:', process.env.DATABASE_URI);

const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
  console.log('MongoDB connection error: ', err);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected in', mongoose.connection.name);
});

const dbURI = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/nodepop';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose.connection;
