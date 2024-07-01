const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Notes")
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log("Error connecting");
  });

const noteSchema = new Schema({
  title: String,
  desc: String,
});
module.exports = new model("Notes", noteSchema);
