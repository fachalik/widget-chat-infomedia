import create from "zustand";
import { devtools, persist } from "zustand/middleware";

type Store = {
  count: number;
  inc: () => void;
  dec: () => void;
};

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        count: 1,
        inc() {
          set((state) => ({ count: state.count + 1 }), false, "increment");
        },
        dec() {
          set((state) => ({ count: state.count - 1 }), false, "decrement");
        },
      }),
      {
        name: "test",
      }
    )
  )
);

// const useStore = create(devtools(persist(store, { name: "tested" })));

export default useStore;
