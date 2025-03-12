import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

function TopLodingBar() {
  const location = useLocation();

  useEffect(() => {
    nprogress.start();
    nprogress.done();

    // Optional: Customize nprogress settings (e.g., speed, minimum percentage)
    nprogress.configure({ showSpinner: false, speed: 500, minimum: 0.1 });
  
    return () => {
      nprogress.done(); // Ensure the loading bar completes on unmount
    };
  }, [location]);

  return null; // This component doesn't render anything itself
}

export default TopLodingBar;
