const mongoose = require("mongoose");

// Cache connection for serverless environments to avoid opening
// multiple connections on each invocation.
async function connectMongoDb(url) {
    if (!url) return;

    if (mongoose.connection && mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    try {
        // mongoose.connect returns a promise
        await mongoose.connect(url, {
            // mongoose v6+ no longer needs these but harmless to include
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database is connected");
        return mongoose.connection;
    } catch (error) {
        console.error("Database Error", error);
        throw error;
    }
}

module.exports = { connectMongoDb };