import { use } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AlertState {
  message: string;
  setMessage: (message: string) => void;
  clearMessage: () => void;
  getMessage: () => string;
}

const useAlertStoreMessage = create<AlertState>((set, get) => ({
  message: "",
  setMessage: (message: string) => set({ message }),
  getMessage: () => get().message,
  clearMessage: () => set({ message: "" }),
}));

export default useAlertStoreMessage;
