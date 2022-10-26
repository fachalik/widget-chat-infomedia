import create from "zustand";
import { devtools, persist } from "zustand/middleware";
const useIsLoad = create()(devtools(persist((set) => ({
    isLoad: true,
    setIsLoad() {
        set((state) => ({ isLoad: !state.isLoad }), false, "widget-isLoad");
    },
}), {
    name: "widget-isLoad",
})));
export default useIsLoad;
