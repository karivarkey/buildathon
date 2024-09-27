import { useState, useEffect } from "react";
import axios from "axios";

const EditCampModal = ({ camp, isOpen, onClose, onSave }) => {
  const [campDetails, setCampDetails] = useState({
    name: camp.name,
    address: camp.address,
    capacity: camp.capacity,
    requirements: camp.requirements,
  });

  // Update state when camp prop changes
  useEffect(() => {
    if (camp) {
      setCampDetails({
        name: camp.name,
        address: camp.address,
        capacity: camp.capacity,
        requirements: camp.requirements,
      });
    }
  }, [camp]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle requirements input change
  const handleRequirementChange = (index, field, value) => {
    const updatedRequirements = [...campDetails.requirements];
    updatedRequirements[index] = { ...updatedRequirements[index], [field]: value };
    setCampDetails((prev) => ({ ...prev, requirements: updatedRequirements }));
  };

  // Add a new empty requirement
  const handleAddRequirement = () => {
    const newRequirement = { name: "", amount: 0, description: "" };
    setCampDetails((prev) => ({
      ...prev,
      requirements: [...prev.requirements, newRequirement],
    }));
  };

  // Remove a requirement
  const handleRemoveRequirement = (index) => {
    const updatedRequirements = campDetails.requirements.filter((_, i) => i !== index);
    setCampDetails((prev) => ({ ...prev, requirements: updatedRequirements }));
  };

  // Submit form and update camp data
  const handleSubmit = async () => {
    console.log(campDetails)
    try {
      await axios.patch(`http://localhost:3001/camp/edit`, campDetails);
      onSave(); // Refresh camp list after saving
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to update camp", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center py-2"
      style={{ zIndex: 1000 }} // Ensure modal is above other content
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative"
        style={{ maxHeight: "80vh", overflowY: "auto" }} // Scroll if content exceeds 80% of the viewport height
      >
        <h2 className="text-xl font-bold mb-4 text-center">Edit Camp</h2>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={campDetails.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={campDetails.address}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2">Capacity</label>
        <input
          type="number"
          name="capacity"
          value={campDetails.capacity}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <h3 className="text-lg font-semibold mt-4">Requirements</h3>
        {campDetails.requirements.map((req, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={req.name}
              onChange={(e) => handleRequirementChange(index, "name", e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <label className="block mb-2">Amount</label>
            <input
              type="number"
              value={req.amount}
              onChange={(e) => handleRequirementChange(index, "amount", e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <label className="block mb-2">Description</label>
            <input
              type="text"
              value={req.description}
              onChange={(e) => handleRequirementChange(index, "description", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={() => handleRemoveRequirement(index)}
              className="mt-2 px-4 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={handleAddRequirement}
          className="px-4 py-2 bg-green-500 text-white rounded mt-2"
        >
          Add Requirement
        </button>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCampModal;
