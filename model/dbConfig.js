const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
let MongoUrl = process.env.MONGO_URL;

mongoose
  .connect(MongoUrl,)
  .then(() => {
    console.log("Connected to MongoDB Server!");
  })
  .catch((err) => {
    console.log(err);
  });

const connection = mongoose.connection;

module.exports = connection;
