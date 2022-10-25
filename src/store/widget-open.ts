import create from "zustand";
import { devtools, persist } from "zustand/middleware";

type Store = {
  open: boolean;
  setOpen: () => void;
};

const useOpen = create<Store>()(
  devtools(
    persist(
      (set) => ({
        open: false,
        setOpen() {
          set((state) => ({ open: !state.open }), false, "widget-open");
        },
      }),
      {
        name: "widget-open",
      }
    )
  )
);

export default useOpen;
