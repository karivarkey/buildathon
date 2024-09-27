import { useState } from "react";

const SOSButton = () => {
  const [isSOSActive, setIsSOSActive] = useState(false);

  const handleSOS = () => {
    setIsSOSActive(true);
  };

  return (
    <div className="relative w-full h-screen">
      {/* SOS Button */}
      {!isSOSActive && (
        <button
          onClick={handleSOS}
          className="absolute right-4 top-12 transform -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 focus:outline-none transition-all duration-300 ease-in-out"
        >
          SOS
        </button>
      )}

      {/* Fullscreen SOS Overlay */}
      {isSOSActive && (
        <div className="fixed inset-0 bg-red-500 flex items-center justify-center z-50 transition-all duration-700 ease-in-out">
          <h1 className="text-white text-6xl font-bold animate-pulse">SOS</h1>
        </div>
      )}
    </div>
  );
};

export default SOSButton;
