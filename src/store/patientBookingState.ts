import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IState {
  canBook: boolean;
  toggle: () => void;
  getBookedState: () => boolean;
  setBookedState: (skippe: boolean) => void;
}

const booker = persist<IState>(
  (set, get) => ({
    canBook: false,
    toggle: () => set((state) => ({ canBook: !state.canBook })),
    getBookedState: () => get().canBook,
    setBookedState: (canBook) => set({ canBook }),
  }),
  {
    name: "bookMe",
    storage: createJSONStorage(() => localStorage),
  },
);

const useBookState = create(booker);
export default useBookState;
