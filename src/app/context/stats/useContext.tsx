import { useContext } from "react";
import { StatsContext } from "./StatsContext";

export const useStats = () => {
  const ctx = useContext(StatsContext);

  if (!ctx) {
    throw new Error("useStats must be used within StatsProvider");
  }

  return ctx;
};
