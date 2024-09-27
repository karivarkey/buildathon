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
  
      // Create a new Disease document using the extracted data
      const newDisease = new Disease({
        name,
        date,
        severity,
        mortality,
        location,
      });
  
      // Save the new Disease document to the database
      await newDisease.save();
  
      // Send a success response
      res.status(201).json({ message: "Disease added successfully", data: newDisease });
    } catch (error) {
      console.error("Error adding disease data:", error);
      res.status(500).json({ message: "Error adding disease data", error: error.message });
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
