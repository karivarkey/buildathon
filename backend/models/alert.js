// models/Alert.js
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  disease: { type: String, required: true },
  radius: { type: Number, required: true },
  location: { type: String, required: true },
});

const Alert = mongoose.model("Alert", alertSchema);

module.exports = Alert;
