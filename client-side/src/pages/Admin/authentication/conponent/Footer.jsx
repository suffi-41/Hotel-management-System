import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white shadow-md w-full shadow-lg ">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center h-16">
        {/* Hotel Logo */}
        <img
          src="/path-to-your-logo.png" // Replace with the actual path to your logo
          alt="Hotel Logo"
          className="h-8"
        />
        {/* Hotel Name */}
        <span className="text-gray-700 font-semibold text-sm">
          Hotel Sunshine
        </span>
        {/* Copyright */}
        <span className="text-gray-500 text-sm">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
