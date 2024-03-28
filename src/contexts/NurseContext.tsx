import React, { useContext, useState } from "react";
type INurseContext = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  variant: string;
  setVariant: React.Dispatch<React.SetStateAction<string>>;
};
const NurseContext = React.createContext<INurseContext>({
  message: "",
  setMessage: () => {},
  show: false,
  setShow: () => {},
  variant: "",
  setVariant: () => {},
});

export function useNurse() {
  return useContext(NurseContext);
}

function NurseProvider({ children }: any) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("success");

  const value = { message, setMessage, show, setShow, variant, setVariant };
  return (
    <NurseContext.Provider value={value}>{children}</NurseContext.Provider>
  );
}

export default NurseProvider;
