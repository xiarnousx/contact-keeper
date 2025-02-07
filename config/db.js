const monngoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await monngoose.connect(db, {
      dbName: "contacts",
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
