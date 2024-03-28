import { useState, useEffect } from "react";

export const useLocalStorageAlert = () => {
  const [alerted, setAlerted] = useState(localStorage.getItem("alert"));
  const [alertFor, setAlertFor] = useState(localStorage.getItem("alertFor"));
  //   cross button click close alert instantly
  const crossClick = () => {
    setAlerted(null);
    setAlertFor(null);
    localStorage.removeItem("alert");
    localStorage.removeItem("alertFor");
  };

  useEffect(() => {
    const alert = localStorage.getItem("alert");
    const alertFor = localStorage.getItem("alertFor");

    if (alert !== null && alertFor !== null) {
      const timeoutId = setTimeout(() => {
        setAlerted(null);
        setAlertFor(null);
        localStorage.removeItem("alert");
        localStorage.removeItem("alertFor");
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  return { alerted, alertFor, crossClick };
};
