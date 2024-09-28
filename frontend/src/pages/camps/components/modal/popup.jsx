// CustomModal.js
import React from "react";

const CustomModal = ({ isOpen, onClose, location }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 z-60">
        <h2 className="text-xl font-semibold mb-2">{location.name}</h2>
        <p>
          <strong>Latitude:</strong> {location.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {location.longitude}
        </p>
        <button
          className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
