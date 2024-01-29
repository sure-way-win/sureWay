const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose.connect(
    "mongodb+srv://musthak:Mk741300@cluster0.zl8gzee.mongodb.net/SureWay2024",
    {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    }
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB Atlas");
  });
};

module.exports = connectToDatabase;
