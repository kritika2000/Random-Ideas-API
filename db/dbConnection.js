const mongoose = require('mongoose');
const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected To DB');
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = connect;
