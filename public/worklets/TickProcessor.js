/* global currentTime */
const FRAME_PER_SECOND = 60;
const FRAME_INTERVAL = 1 / FRAME_PER_SECOND;
/**
 *  Tick emitter.
 *
 * @class TickProcessor
 * @extends AudioWorkletProcessor
 */
export class TickProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._lastUpdate = currentTime;
  }
  process() {
    // Post a message to the node every 16ms
    if (currentTime - this._lastUpdate > FRAME_INTERVAL) {
      this.port.postMessage(currentTime);
      this._lastUpdate = currentTime;
    }
    return true;
  }
}
registerProcessor("tick", TickProcessor);
