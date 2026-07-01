export interface Settings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
  autoStartBreak: boolean;
  autoStartFocus: boolean;
}

export interface SettingsContextType {
  settings: Settings;
  setSettings?: React.Dispatch<React.SetStateAction<Settings>>;
  updateSettings: <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => void;
}
