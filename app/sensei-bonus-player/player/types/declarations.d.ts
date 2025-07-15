interface Window {
  webkitAudioContext: typeof AudioContext;
  logLevel: "none" | "event" | "info" | "state" | "warn" | "error";
}

// AudioWorklet types
declare const AudioWorkletProcessor: {
  prototype: AudioWorkletProcessor;
  new (): AudioWorkletProcessor;
};

declare interface AudioWorkletProcessor {
  readonly port: MessagePort;
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ): boolean;
}

declare let currentTime: number;

declare function registerProcessor(
  name: string,
  processorCtor: typeof AudioWorkletProcessor
): void;
