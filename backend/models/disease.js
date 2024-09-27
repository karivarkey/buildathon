// models/disease.js
const mongoose = require("mongoose");

// Define the Disease schema
const diseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  severity: { type: String, required: true }, // You can also use an Enum if you have specific severity levels
  mortality: { type: Number, required: true }, // Percentage or number
  location: { type: String, required: true },
});

// Create the Disease model
const Disease = mongoose.model("Disease", diseaseSchema);

// Export the model
module.exports = Disease;
