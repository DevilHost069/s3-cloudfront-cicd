import { create } from "zustand";

interface IState {
  opened: boolean;
  toggle: () => void;
  getOpened: () => boolean;
  setOpened: (opened: boolean) => void;
}

const useSideBarState = create<IState>((set, get) => ({
  opened: false,
  toggle: () => set((state) => ({ opened: !state.opened })),
  getOpened: () => get().opened,
  setOpened: (opened) => set({ opened }),
}));

export default useSideBarState;
