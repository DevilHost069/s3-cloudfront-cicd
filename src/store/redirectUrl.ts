import { create } from "zustand";

interface IState {
  url: string;
  setUrl: (url: string) => void;
  getUrl: () => string;
  resetUrl: () => void;
}

const useRedirectURL = create<IState>((set, get) => ({
  url: "",
  setUrl: (url) => set({ url }),
  getUrl: () => get().url,
  resetUrl: () => set({ url: "" }),
}));

export default useRedirectURL;
