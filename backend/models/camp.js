const mongoose = require('mongoose')
const campSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  capacity: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  requirements: {
    type: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
      },
    ],
    default: null, // Allows the requirements to be null
  },
});

const Camp = mongoose.model("Camp",campSchema)
module.exports = Camp