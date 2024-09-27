const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Define the schema
const campSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  capacity: { type: Number, required: true },
  requirements: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      description: { type: String, required: true },
    },
  ],
});

// Create the model
const Camp = mongoose.model("Camp", campSchema);

// Export the model
module.exports = Camp;
