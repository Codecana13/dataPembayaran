"use client";

import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetRequest = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      console.log("Raw response:", res); // ✅ Debug response before parsing JSON
  
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`); // Handle non-200 status codes
      }
  
      const data = await res.json();
      console.log("Parsed JSON response:", data); // ✅ Debug parsed response
      setMessage(data.message);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Failed to send reset email.");
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">🔑 Reset Password</h2>
        {message && <p className="text-green-400 text-center">{message}</p>}
        <form onSubmit={handleResetRequest} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            📩 Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
