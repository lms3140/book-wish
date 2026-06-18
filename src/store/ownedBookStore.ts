import { create } from "zustand";
import type { OwnedBook } from "@/feature/bookType";

export type OwnedBookSidePanelMode = "edit" | "add";

type OwnedBookStore = {
  ownedBook: OwnedBook | null;
  mode: OwnedBookSidePanelMode;
  setOwnedBook: (ownedBook: OwnedBook) => void;
  clearOwnedBook: () => void;
  setMode: (mode: OwnedBookSidePanelMode) => void;
};

export const useOwnedBookStore = create<OwnedBookStore>((set) => ({
  ownedBook: null,
  mode: "add",

  setOwnedBook: (ownedBook: OwnedBook) => set({ ownedBook }),

  clearOwnedBook: () => set({ ownedBook: null }),

  setMode: (mode: OwnedBookSidePanelMode) => set({ mode }),
}));
