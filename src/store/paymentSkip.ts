import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IState {
  skipped: boolean;
  toggle: () => void;
  getSkipped: () => boolean;
  setSkipped: (skippe: boolean) => void;
}

const skipper = persist<IState>(
  (set, get) => ({
    skipped: false,
    toggle: () => set((state) => ({ skipped: !state.skipped })),
    getSkipped: () => get().skipped,
    setSkipped: (skipped) => set({ skipped }),
  }),
  {
    name: "paymentSkip",
    storage: createJSONStorage(() => localStorage),
  },
);

const usePaymentSkip = create(skipper);
export default usePaymentSkip;
