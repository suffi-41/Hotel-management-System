import React from "react";

export default function DashboardScreen({ children }) {
  return (
    <div className="max-h-[calc(100vh-4rem)] w-full overflow-y-auto">
      {children}
    </div>
  );
}
