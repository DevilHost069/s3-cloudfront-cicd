import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTopOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top whenever the location (route) changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.search]); // Add any other dependencies you need

  // You can return any additional data or functions that might be useful
  return {};
};
