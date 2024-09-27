const mongoose = require("mongoose");

const sosCallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    location: {
      type: String, // This will store the reverse geocoded address
    },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const SOSCall = mongoose.model("SOSCall", sosCallSchema);

module.exports = SOSCall;
