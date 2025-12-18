const mongoose = require("mongoose");

async function connectMongoDb(url) {
  if (!url) throw new Error("MongoDB URL missing");

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(url);
    console.log("Database is connected");
    return mongoose.connection;
  } catch (error) {
    console.error("Database Error", error);
    throw error;
  }
}

module.exports = { connectMongoDb };
