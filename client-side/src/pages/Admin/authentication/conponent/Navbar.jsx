import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md w-full shadow-lg ">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center h-16">
        {/* Hotel Name and Logo */}
        <div className="flex items-center space-x-2">
          {/* Hotel Logo */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAsmkdS4spCFgLe4eD4tyHQNEv4UzkbetBbQ&s" // Replace with the actual path to your logo
            alt="Hotel Logo"
            className="h-10"
          />
          {/* Hotel Name */}
          <span className="text-2xl font-bold text-gray-800">
            Hotel Sunshine
          </span>
        </div>
      </div>
    </nav>
  );
}
