import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import EditCampModal from "./EditCampModal"; // Import the modal for editing
import CreateCampModal from "./createCampModal";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null); // For editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal open state for editing
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Modal open state for creating

  useEffect(() => {
    fetchCamps();
  }, []);

  // Function to fetch camps from the server
  const fetchCamps = () => {
    axios
      .get("http://localhost:3001/camp/all")
      .then((res) => {
        setCamps(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Open modal with selected camp details for editing
  const openEditModal = (camp) => {
    setSelectedCamp(camp);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCamp(null);
  };

  // Open create camp modal
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col justify-between">
        <h1 className="font-bold font-rubik text-center p2 shadow-lg text-3xl p-2">
          CAMPS
        </h1>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ maxHeight: "80vh", overflowY: "auto" }}>
          {Array.isArray(camps) && camps.length > 0 ? (
            camps.map((camp) => (
              <div
                key={camp._id}
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-bold mb-2">{camp.name}</h2>
                <p className="text-gray-700 mb-1">
                  <strong>Address:</strong> {camp.address}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Capacity:</strong> {camp.capacity}
                </p>
                <h3 className="text-lg font-semibold mt-2 mb-1">Requirements:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {camp.requirements.map((req) => (
                    <li key={req._id}>
                      <strong>{req.name}</strong>: {req.amount} - {req.description}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
                  onClick={() => openEditModal(camp)}
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p>No camps available.</p>
          )}
        </div>
      </div>
      <Navbar />
      <button
        onClick={openCreateModal} // Open the create camp modal
        className="fixed bottom-16 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        Create Camp
      </button>

      {/* Edit Camp Modal */}
      {selectedCamp && (
        <EditCampModal
          camp={selectedCamp}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSave={fetchCamps} // Refresh after saving
        />
      )}

      {/* Create Camp Modal */}
      <CreateCampModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSave={fetchCamps} // Refresh after creating
      />
    </div>
  );
};

export default ManageCamps;
