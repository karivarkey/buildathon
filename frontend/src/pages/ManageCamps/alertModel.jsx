// src/components/AlertModal.js
import React, { useState } from "react";
import axios from "axios";

const AlertModal = ({ isOpen, onClose, onSave }) => {
  const [location, setLocation] = useState("");
  const [disease, setDisease] = useState("");
  const [radius, setRadius] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const alertData = {
      location,
      disease,
      radius: parseInt(radius, 10),
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/alert",
        alertData
      );
      console.log("Alert created:", response.data);
      onSave(); // Refresh the list of alerts
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error creating alert:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Create Alert</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded w-full p-2 mb-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Disease:</label>
            <input
              type="text"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              className="border rounded w-full p-2 mb-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Radius (meters):</label>
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="border rounded w-full p-2 mb-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Create Alert
          </button>
          <button
            type="button"
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlertModal;
