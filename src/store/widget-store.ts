/* eslint-disable no-unused-vars */
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

type Store = {
  token: string | null;
  logo: string | null;
  isLoad: boolean;
  color: any;
  setIsLoad: () => void;
  setColor: (color: any) => void;
  setToken: (token: string) => void;
  setLogo: (logo: string) => void;
  reset: () => void;
};

const initialState = {
  token: null,
  logo: null,
  isLoad: true,
  color: {
    primary_color: "EB1C24",
    secondary_color: "929497",
  },
};

const useWidgetStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        // setLoader for first time
        setIsLoad() {
          set((state) => ({ isLoad: !state.isLoad }), false, "widget-isLoad");
        },

        // setColor passing from params
        setColor(color: any) {
          set(() => ({ color: color }), false, "widget-color");
        },

        // setToken when terms and condition is accepted
        setToken(token: string) {
          set(() => ({ token }), false, "widget-token");
        },

        // setLogo passing from params
        setLogo(logo: string) {
          set(() => ({ logo }), false, "widget-logo");
        },

        // clear State
        reset() {
          set((state) => ({
            // not delete logo and color from persisted aka localstorage
            token: null,
            logo: state.logo,
            isLoad: true,
            color: state.color,
          }));
        },
      }),
      {
        name: "widget-store",
      }
    )
  )
);

export default useWidgetStore;
