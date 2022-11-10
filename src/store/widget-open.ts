/* eslint-disable no-unused-vars */
import create from "zustand";
import { devtools } from "zustand/middleware";

type Store = {
  open: boolean;

  setOpen: () => void;
};

const initialState = {
  open: false,
};

const useWidgetOpen = create<Store>()(
  devtools(
    (set) => ({
      ...initialState,
      // setOpen chat widget
      setOpen() {
        set((state) => ({ open: !state.open }), false, "widget-open");
      },
    }),
    {
      name: "widget-open",
    }
  )
);

export default useWidgetOpen;
