/* eslint-disable no-unused-vars */
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

type Store = {
  chat: any[];
  addChat: (chat: any) => void;
  reset: () => void;
};

const initialState = {
  chat: [],
};

const useWidgetChat = create<Store>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // setLogo passing from params
        addChat(chat: any) {
          set(
            (state) => ({ chat: [...state.chat, chat] }),
            false,
            "widget-logo"
          );
        },

        // clear State
        reset() {
          set(() => initialState);
        },
      }),
      {
        name: "widget-store",
      }
    )
  )
);

export default useWidgetChat;