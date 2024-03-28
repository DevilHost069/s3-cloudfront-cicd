import React, { useContext, useState } from "react";
export type IAlertContext = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  variant: string;
  setVariant: React.Dispatch<React.SetStateAction<string>>;
  stop: boolean;
  setStop: React.Dispatch<React.SetStateAction<boolean>>;
};
const AlertContext = React.createContext<IAlertContext>({
  message: "",
  setMessage: () => {},
  show: false,
  setShow: () => {},
  variant: "",
  setVariant: () => {},
  stop: false,
  setStop: () => {},
});

export function useAlert() {
  return useContext(AlertContext);
}

function AlertProvider({ children }: any) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [stop, setStop] = useState(false);
  const [variant, setVariant] = useState("success");

  const value = {
    message,
    setMessage,
    show,
    setShow,
    variant,
    setVariant,
    stop,
    setStop,
  };
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}

export default AlertProvider;
