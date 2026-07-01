import { useEffect, useState } from "react";
import type { Settings } from "./settings.type";
import { SettingsContext } from "./SettingsContext";

const defaultSettings: Settings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
  autoStartBreak: false,
  autoStartFocus: false,
};

const getInitialSettings = (): Settings => {
  const saved = localStorage.getItem("settings");
  if (!saved || saved === "undefined") {
    return defaultSettings;
  }
  try {
    return JSON.parse(saved) as Settings;
  } catch (error) {
    console.error("Ошибка чтения settings из localStorage:", error);

    localStorage.removeItem("settings");

    return defaultSettings;
  }
};

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState(getInitialSettings);
  const updateSettings = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);
  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
