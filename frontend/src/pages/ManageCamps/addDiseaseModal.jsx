// AddDiseaseModal.js
import React, { useState } from "react";

const AddDiseaseModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [severity, setSeverity] = useState("");
  const [mortality, setMortality] = useState(0);
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const diseaseData = {
      name,
      date,
      severity,
      mortality: parseFloat(mortality),
      location,
    };

    onSave(diseaseData); // Call the onSave function passed as prop

    // Reset form fields
    setName("");
    setDate("");
    setSeverity("");
    setMortality(0);
    setLocation("");

    // Close modal
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Record Disease</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border rounded p-2"
            />
          </label>

          <label className="block mb-2">
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 block w-full border rounded p-2"
            />
          </label>

          <label className="block mb-2">
            Severity:
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              required
              className="mt-1 block w-full border rounded p-2"
            >
              <option value="" disabled>
                Select severity
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

          <label className="block mb-2">
            Mortality Rate:
            <input
              type="number"
              value={mortality}
              onChange={(e) => setMortality(e.target.value)}
              required
              step="0.01"
              className="mt-1 block w-full border rounded p-2"
            />
          </label>

          <label className="block mb-2">
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="mt-1 block w-full border rounded p-2"
            />
          </label>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDiseaseModal;
