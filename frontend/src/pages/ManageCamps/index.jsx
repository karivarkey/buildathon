import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const HospitalAuth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Predefined email and password for comparison
  const validEmail = "hospital@example.com"; // Example email
  const validPassword = "password123"; // Example password

  // Function to handle login
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous error

    // Simulate a login process
    setTimeout(() => {
      if (email === validEmail && password === validPassword) {
        // Login successful
        console.log("Login successful");
        navigate("/manage-camps");
        // Handle successful login here (e.g., redirect or store user data)
      } else {
        // Login failed
        setError("Invalid email or password");
      }
      setLoading(false); // Reset loading state
    }, 500); // Simulate a short delay for the login process
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h1 className="font-bold text-2xl text-center mb-4">Hospital Login</h1>

        {error && (
          <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col">
          <label className="mb-2 text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 mb-4 border rounded"
            placeholder="Enter your email"
          />

          <label className="mb-2 text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 mb-4 border rounded"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <div className="absolute bottom-0 w-full">
        <Navbar props="adminCamp" />
      </div>
    </div>
  );
};

export default HospitalAuth;
