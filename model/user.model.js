const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true,"Email is already used!"],
  },
  mobile: {
    type: Number,
    required: true,
    unique: [true,"Mobile number is already used!"],
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default:"https://imgs.search.brave.com/mxYw2DY0cyLUCuyTN9ffzx4vQkM4MqIGb1Yq74tqovg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOC8x/MS8xMy8yMS80My9h/dmF0YXItMzgxNDA0/OV8xMjgwLnBuZw"
  },
});

//Export the model
module.exports = mongoose.model("User", userSchema);
