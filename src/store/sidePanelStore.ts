import { create } from "zustand";

export type SidePanelMode = "edit" | "add";

type SidePanelStore = {
  mode: SidePanelMode;
  setMode: (mode: SidePanelMode) => void;
};

export const useSidePanelStore = create<SidePanelStore>((set) => ({
  mode: "add",

  setMode: (mode: SidePanelMode) => set({ mode }),
}));
