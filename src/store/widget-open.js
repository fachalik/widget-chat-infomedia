import create from "zustand";
import { devtools, persist } from "zustand/middleware";
const useOpen = create()(
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
