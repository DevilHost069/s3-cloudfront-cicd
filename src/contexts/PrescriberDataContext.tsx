import { IListPrescriber } from "@components/Nurse/NurseDetail/ModalContent/AssignDoctor";
import { useGetProductOptions } from "@server/prescriber/useGetProductOptions";
import { IProductOptionsRes } from "@shared/types/product";
import React, { useContext, useState } from "react";
export type IPrescriberDataContext = {
  prescriberData: IListPrescriber;
  setPrescriberData: React.Dispatch<React.SetStateAction<IListPrescriber>>;
};
const PrescriberDataContext = React.createContext<IPrescriberDataContext>({
  prescriberData: {
    data: [],
    isError: undefined,
    isLoading: undefined,
    refetch: undefined,
  },
  setPrescriberData: () => {},
});

export function usePrescriberData() {
  return useContext(PrescriberDataContext);
}

function PrescriberDataProvider({ children }: any) {
  const [prescriberData, setPrescribersData] = useState({
    data: [],
    isError: undefined,
    isLoading: undefined,
  });
  const setPrescriberData = (data) => {
    if (!prescriberData.data.length) {
      setPrescribersData(data);
    }
  };
  const value = {
    prescriberData,
    setPrescriberData,
  };
  return (
    <PrescriberDataContext.Provider value={value}>
      {children}
    </PrescriberDataContext.Provider>
  );
}

export default PrescriberDataProvider;
