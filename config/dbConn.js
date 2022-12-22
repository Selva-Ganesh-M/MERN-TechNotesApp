const mongoose = require("mongoose");
const { MONGO_URI } = require("./ENV");

const connectToDb = async () => {
  try {
    mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
