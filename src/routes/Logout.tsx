import { useEffect } from "react";
import { Navigate, Routes } from "react-router-dom";

import useWidgetStore from "../store/widget-store";

export function Logout() {
  const { reset } = useWidgetStore((state) => state);
  useEffect(() => {
    reset();
  }, []);

  return (
    <Routes>
      <Navigate to="/auth" />
    </Routes>
  );
}
