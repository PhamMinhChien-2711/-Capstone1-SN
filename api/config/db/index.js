const mongoose = require('mongoose');

async function connect() {
  try {
    // process.env.MONGODB_URI
    await mongoose.connect('mongodb+srv://tranhuuhunghk:htGpj2MhiKYObat0@socialnetwork.koqc9.mongodb.net/socialnetwork?retryWrites=true&w=majority')
    console.log('Connect successfully!!!');
  } catch (error) {
    console.log('Connect failure!!!');
  }
}

module.exports = { connect };
