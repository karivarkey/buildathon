// server.js
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const Camp = require("./models/camp");
const Disease = require("./models/disease");
const { v4: uuidv4 } = require('uuid');
const cors = require("cors"); // Import the cors package
//get MONGO_URI from .env file
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Route for geocoding an address
app.get("/api/geocode", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res
      .status(400)
      .json({ error: "Address query parameter is required." });
  }

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
          addressdetails: 1,
        },
        headers: {
          "User-Agent": "MyGeocodingApp/1.0 (myemail@example.com)", // Replace with your app name and email
        },
      }
    );

    if (response.data.length === 0) {
      return res.status(404).json({ error: "No results found." });
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from Nominatim." });
  }
});

// Route for reverse geocoding
app.get("/api/reverse", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude query parameters are required." });
  }

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat,
          lon,
          format: "json",
          addressdetails: 1,
        },
        headers: {
          "User-Agent": "MyGeocodingApp/1.0 (myemail@example.com)", // Replace with your app name and email
        },
      }
    );

    if (!response.data) {
      return res.status(404).json({ error: "No results found." });
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from Nominatim." });
  }
});

app.post("/camp/add", async (req, res) => {
  try {
    const { name, address, capacity, requirements } = req.body;

    // Generate a unique ID for the camp
    const uniqueId = uuidv4(); // Generate a new unique ID

    // Create a new Camp document using the extracted data
    const newCamp = new Camp({
      uniqueId,
      name,
      address,
      capacity,
      requirements,
    });

    // Save the new Camp document to the database
    await newCamp.save();

    // Send a success response
    res.status(201).json({ message: "Camp saved successfully", data: newCamp });
  } catch (error) {
    console.error("Error saving camp data:", error);
    res
      .status(500)
      .json({ message: "Error saving camp data", error: error.message });
  }
});

app.put("/camp/edit", async (req, res) => {
  try {
    const { id, name, address, capacity, requirements } = req.body; // Change uniqueId to id

    // Find the camp by _id and update it with the new data
    const updatedCamp = await Camp.findByIdAndUpdate(
      id, // Use the _id field for the query
      { name, address, capacity, requirements },
      { new: true, runValidators: true }
    );

    // Check if the camp was found and updated
    if (!updatedCamp) {
      return res.status(404).json({ message: "Camp not found" });
    }

    // Send a success response with the updated camp data
    res
      .status(200)
      .json({ message: "Camp updated successfully", data: updatedCamp });
  } catch (error) {
    console.error("Error updating camp data:", error);
    res
      .status(500)
      .json({ message: "Error updating camp data", error: error.message });
  }
});

app.get("/camp/all", async (req, res) => {
  try {
    // Retrieve all camp documents from the database
    const camps = await Camp.find();

    // Send a success response with the retrieved camp data
    res
      .status(200)
      .json({ message: "Camps retrieved successfully", data: camps });
  } catch (error) {
    console.error("Error retrieving camp data:", error);
    res
      .status(500)
      .json({ message: "Error retrieving camp data", error: error.message });
  }
});

app.post("/disease/add", async (req, res) => {
    try {
      const { name, date, severity, mortality, location } = req.body;
  
      // Find the existing disease by name and location (case-insensitive search)
      const existingDisease = await Disease.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        location,
      });
  
      let disease;
  
      if (existingDisease) {
        // If disease exists, increment the number field by 1
        disease = await Disease.findOneAndUpdate(
          { _id: existingDisease._id }, // Find by existing disease's _id
          { $inc: { number: 1 } },      // Increment the number field
          { new: true }                 // Return the updated document
        );
      } else {
        // If no disease exists, create a new one with number set to 1
        disease = new Disease({
          name,
          date,
          severity,
          mortality,
          location,
          number: 1,  // Start new disease with number 1, not 0
        });
        await disease.save(); // Save the new disease document
      }
  
      // Send a success response with the updated disease
      res.status(201).json({
        message: existingDisease
          ? "Existing disease updated successfully"
          : "New disease added successfully",
        data: disease,
      });
    } catch (error) {
      console.error("Error adding disease data:", error);
      res.status(500).json({ message: "Error adding disease data", error: error.message });
    }
  });
  
  
  app.get("/disease/all", async (req, res) => {
    try {
      // Fetch all diseases from the database
      const diseases = await Disease.find();
  
      // Check if diseases are found
      if (diseases.length === 0) {
        return res.status(404).json({ message: "No diseases found" });
      }
  
      // Send a success response with the list of diseases
      res.status(200).json({ message: "Diseases retrieved successfully", data: diseases });
    } catch (error) {
      console.error("Error retrieving diseases:", error);
      res.status(500).json({ message: "Error retrieving diseases", error: error.message });
    }
  });
  

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
