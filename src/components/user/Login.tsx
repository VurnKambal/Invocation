import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// For Vite, use import.meta.env instead of process.env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IPGEOLOCATION_API_KEY = import.meta.env.VITE_IPGEOLOCATION_API_KEY; // Ensure you have this in your environment variables

interface LoginProps {
  onLogin: (token: string) => void;
}

interface ClientInfo {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  org: string;
  latitude: number;
  longitude: number;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Fetch client info using ipgeolocation API during form submission
    try {
      const clientResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEOLOCATION_API_KEY}`);
      setClientInfo({
        ip: clientResponse.data.ip,
        city: clientResponse.data.city,
        region: clientResponse.data.state_prov,
        country_name: clientResponse.data.country_name,
        org: clientResponse.data.organization,
        latitude: parseFloat(clientResponse.data.latitude),
        longitude: parseFloat(clientResponse.data.longitude)
      });
      console.log(clientResponse);

      const deviceInfo = {
        os: navigator.platform,
        browser: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
        clientInfo: clientResponse.data, // Use fetched client info
        deviceInfo,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        onLogin(response.data.token);
        navigate('/');
      } else {
        throw new Error("Login successful, but no token received");
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data?.error || "Login failed");
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError(error.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black bg-white"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-800">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
