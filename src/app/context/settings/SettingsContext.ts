import { createContext } from "react";
import type { SettingsContextType } from "./settings.type";

export const SettingsContext = createContext<SettingsContextType | null>(null);
