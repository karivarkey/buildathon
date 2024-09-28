import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import EditCampModal from "./EditCampModal"; // Import the modal for editing
import CreateCampModal from "./createCampModal";
import AddDiseaseModal from "./addDiseaseModal";
import AlertModal from "./alertModel";

const ManageCamps = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null); // For editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal open state for editing
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Modal open state for creating
  const [isAddDiseaseModalOpen, setIsAddDiseaseModalOpen] = useState(false); // Modal state for adding disease
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false); // Modal state for alerts
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

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

  // Open alert modal
  const openAlertModal = () => {
    setIsAlertModalOpen(true);
    setIsDropdownOpen(false); // Close dropdown when opening modal
  };

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  // Open modal with selected camp details for editing
  const openEditModal = (camp) => {
    setSelectedCamp(camp);
    setIsEditModalOpen(true);
    setIsDropdownOpen(false); // Close dropdown when opening modal
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCamp(null);
  };

  // Open create camp modal
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
    setIsDropdownOpen(false); // Close dropdown when opening modal
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Open Add Disease modal
  const openAddDiseaseModal = () => {
    setIsAddDiseaseModalOpen(true);
    setIsDropdownOpen(false); // Close dropdown when opening modal
  };

  const closeAddDiseaseModal = () => {
    setIsAddDiseaseModalOpen(false);
  };

  // Handle saving a new disease
  const handleSaveDisease = (diseaseData) => {
    axios
      .post("http://localhost:3001/disease/add", diseaseData)
      .then((response) => {
        console.log("Disease added successfully:", response.data);
        closeAddDiseaseModal(); // Close the modal after saving
      })
      .catch((error) => {
        console.error("Error adding disease:", error);
      });
  };

  // Logout function
  const handleLogout = () => {
    // You might want to clear any authentication tokens here
    navigate("/manage/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col justify-between">
        <h1 className="font-bold font-rubik text-center p-2 shadow-lg text-lg p-2">
          HOSPITAL ADMIN SYSTEM
        </h1>
        <div
          className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
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
                <h3 className="text-lg font-semibold mt-2 mb-1">
                  Requirements:
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {camp.requirements.map((req) => (
                    <li key={req._id}>
                      <strong>{req.name}</strong>: {req.amount} -{" "}
                      {req.description}
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
      <div className="w-full absolute bottom-0">
        <Navbar props="adminCamp" />
      </div>

      {/* Dropdown Button */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="fixed bottom-20 right-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          Actions
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 bottom-16 bg-white border border-gray-300 rounded shadow-lg z-50">
            <button
              onClick={openCreateModal}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Create Camp
            </button>
            <button
              onClick={openAddDiseaseModal}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Record Disease
            </button>
            <button
              onClick={openAlertModal}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Alert People
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleLogout} // Logout button
        className="fixed top-20 right-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 focus:outline-none"
      >
        Logout
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

      {/* Add Disease Modal */}
      <AddDiseaseModal
        isOpen={isAddDiseaseModalOpen}
        onClose={closeAddDiseaseModal}
        onSave={handleSaveDisease} // Function to handle disease saving
      />

      {/* Alert Modal */}
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={closeAlertModal}
        onSave={fetchCamps} // Refresh after saving an alert
      />
    </div>
  );
};

export default ManageCamps;
