import { useState, useEffect } from "react";

const useExpirationCheck = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [passChange, setPassChange] = useState(false);

  useEffect(() => {
    // Function to compare the expiration date with the current time
    const compareTimeFromExptoNow = (expiryDate) => {
      // Implement your comparison logic here
      // You can use Date objects for comparison
      const currentDateTime = new Date();
      const expirationDateTime = new Date(expiryDate);
      return currentDateTime > expirationDateTime;
    };

    // Check expiration periodically
    const checkExpiration = () => {
      // Retrieve the expiration date from localStorage
      const expDate = localStorage.getItem("expiry");
      const token = localStorage.getItem("token");
      const passChanger = localStorage.getItem("passChange");

      // Check if the expiration date exists and if it's expired
      if (!passChanger) {
        if (expDate && token) {
          const isExpired = compareTimeFromExptoNow(expDate);

          setIsExpired(isExpired);
        } else {
          // Handle the case where there is no expiration date in localStorage
          // You may want to set a default behavior here
          console.warn("No expiration date found in localStorage");
          setIsExpired(true);
        }
      } else {
        setPassChange(true);
      }
    };

    // Check expiration initially
    checkExpiration();

    // Set up interval to check expiration periodically (every 5 minutes in this example)
    const intervalId = setInterval(() => {
      checkExpiration();
    }, 200); // every 200 ms

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return {
    isExpired,
    setIsExpired,
    passChange,
    setPassChange,
  };
};

export default useExpirationCheck;
