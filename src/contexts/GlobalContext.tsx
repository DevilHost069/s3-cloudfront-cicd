import React from "react";

type GlobalContextType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = React.createContext<{
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}>(null as unknown as GlobalContextType);

function GlobalContextProvider({ children }: React.PropsWithChildren) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <GlobalContext.Provider
      value={{
        showModal,
        setShowModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
