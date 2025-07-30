import { PLAYER_EVENTS } from "../types/playerEvents";

window.logLevel = process.env.NODE_ENV !== 'development' ? 'none' : 'event';

const logger = (context: string) => {
  if (['event', 'info'].includes(window.logLevel)) {
    console.log(`[${context}]`, 'created');
  }
  return {
    event: (eventName: PLAYER_EVENTS, obj: any) => {
      if (window.logLevel !== 'event' || [PLAYER_EVENTS.timeupdate, PLAYER_EVENTS.volumeupdate].includes(eventName)) return;
      console.log(`%c[${context}] ${eventName}`, 'background-color: #2A282D; color: #79DCE9; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; font-weight: bold;', ...(obj ? [obj] : []));
    },
    info: (...args: any[]) => {
      if (!['event', 'info'].includes(window.logLevel)) return;
      console.log(`[${context}]`, ...args);
    },
    state: (state: string) => {
      if (!['event', 'info', 'state'].includes(window.logLevel)) return;
      console.log(`%c[${context}] ${state}`, 'background-color: #2A282D; color: #A9DD77; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; font-weight: bold;');
    },
    warn: (...args: any[]) => {
      if (!['event', 'info', 'state', 'warn'].includes(window.logLevel)) return;
      console.warn(`[${context}]`, ...args);
    },
    error: (...args: any[]) => {
      if (!['event', 'info', 'state', 'warn', 'error', 'none'].includes(window.logLevel)) return;
      console.error(`[${context}]`, ...args);
    },
  };
};

export default logger;
