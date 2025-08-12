/// <reference types="react-scripts" />

interface Window {
  webkitAudioContext: typeof AudioContext;
  logLevel: "none" | "event" | "info" | "state" | "warn" | "error";
}
