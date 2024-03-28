import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTopOnQueryParamChange = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if the 'name' query parameter has changed
    const previousName = new URLSearchParams(location.search).get("name");
    const currentName = new URLSearchParams(window.location.search).get("name");

    if (previousName !== currentName) {
      // Scroll to the top whenever the 'name' parameter changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.search]);

  // You can return any additional data or functions that might be useful
  return {
    // Add any additional properties or functions you need
  };
};
