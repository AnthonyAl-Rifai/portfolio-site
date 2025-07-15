import { PLAYER_EVENTS } from "../types/playerEvents";

// Check if window exists (client-side only)
const getLogLevel = () => {
  if (typeof window === "undefined") return "none";
  return ((window as { logLevel?: string }).logLevel =
    process.env.NODE_ENV !== "development" ? "none" : "event");
};

const logger = (context: string) => {
  const logLevel = getLogLevel();
  if (["event", "info"].includes(logLevel)) {
    console.log(`[${context}]`, "created");
  }
  return {
    event: (eventName: PLAYER_EVENTS, obj: unknown) => {
      const currentLogLevel = getLogLevel();
      if (
        currentLogLevel !== "event" ||
        [PLAYER_EVENTS.timeupdate, PLAYER_EVENTS.volumeupdate].includes(
          eventName
        )
      )
        return;
      console.log(
        `%c[${context}] ${eventName}`,
        "background-color: #2A282D; color: #79DCE9; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; font-weight: bold;",
        ...(obj ? [obj] : [])
      );
    },
    info: (...args: unknown[]) => {
      const currentLogLevel = getLogLevel();
      if (!["event", "info"].includes(currentLogLevel)) return;
      console.log(`[${context}]`, ...args);
    },
    state: (state: string) => {
      const currentLogLevel = getLogLevel();
      if (!["event", "info", "state"].includes(currentLogLevel)) return;
      console.log(
        `%c[${context}] ${state}`,
        "background-color: #2A282D; color: #A9DD77; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; font-weight: bold;"
      );
    },
    warn: (...args: unknown[]) => {
      const currentLogLevel = getLogLevel();
      if (!["event", "info", "state", "warn"].includes(currentLogLevel)) return;
      console.warn(`[${context}]`, ...args);
    },
    error: (...args: unknown[]) => {
      const currentLogLevel = getLogLevel();
      if (
        !["event", "info", "state", "warn", "error", "none"].includes(
          currentLogLevel
        )
      )
        return;
      console.error(`[${context}]`, ...args);
    },
  };
};

export default logger;
