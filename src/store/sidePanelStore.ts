import { create } from "zustand";

export type SidePanelMode = "detail" | "edit" | "add";

type SidePanelStore = {
  mode: SidePanelMode;
  setMode: (mode: SidePanelMode) => void;
};

export const useSidePanelStore = create<SidePanelStore>((set) => ({
  mode: "detail",

  setMode: (mode: SidePanelMode) => set({ mode }),
}));
