// Copyright (c) 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/* global currentTime */

const SMOOTHING_FACTOR = 0.8;
const FRAME_PER_SECOND = 60;
const FRAME_INTERVAL = 1 / FRAME_PER_SECOND;
const VOLUME_PEAK = 1;

/**
 *  Measure microphone volume.
 *
 * @class VolumeMeterProcessor
 * @extends AudioWorkletProcessor
 */
export class VolumeMeterProcessor extends AudioWorkletProcessor {
  private _lastUpdate: number;

  private _volumeLeft: number;
  private _volumeRight: number;

  constructor() {
    super();
    this._lastUpdate = currentTime;
    this._volumeLeft = 0;
    this._volumeRight = 0;
  }

  calculateRMS(inputChannelData: Float32Array) {
    // Calculate the squared-sum.
    let sum = 0;
    for (let i = 0; i < inputChannelData.length; i++) {
      sum += inputChannelData[i] * inputChannelData[i];
    }

    // Calculate the RMS level and update the volume.
    const rms = Math.sqrt(sum / inputChannelData.length);
    return Math.pow(rms, 0.125);
  }

  process(inputs: Float32Array[][]) {
    if (inputs[0].length === 2) {
      const inputChannelDataLeft = inputs[0][0];
      const inputChannelDataRight = inputs[0][1];

      // Calculate RMS for each channel
      const rmsLeft = this.calculateRMS(inputChannelDataLeft);
      const rmsRight = this.calculateRMS(inputChannelDataRight);

      // Apply smoothing factor and update volumes
      this._volumeLeft = Math.max(rmsLeft, this._volumeLeft * SMOOTHING_FACTOR);
      this._volumeRight = Math.max(
        rmsRight,
        this._volumeRight * SMOOTHING_FACTOR
      );

      // Post a message to the node every 16ms
      if (currentTime - this._lastUpdate > FRAME_INTERVAL) {
        this.port.postMessage([
          this._volumeLeft * VOLUME_PEAK,
          this._volumeRight * VOLUME_PEAK,
        ]);
        this._lastUpdate = currentTime;
      }
    } else if (inputs[0][0]) {
      // This example only handles mono channel.
      const inputChannelData = inputs[0][0];

      // Post a message to the node every 16ms.
      if (currentTime - this._lastUpdate > FRAME_INTERVAL) {
        const rms = this.calculateRMS(inputChannelData);

        // Apply smoothing factor and update volumes
        this._volumeLeft = Math.max(rms, this._volumeLeft * SMOOTHING_FACTOR);
        this.port.postMessage([
          this._volumeLeft * VOLUME_PEAK,
          this._volumeLeft * VOLUME_PEAK,
        ]);
        this._lastUpdate = currentTime;
      }
    }

    return true;
  }
}

registerProcessor("volume-meter", VolumeMeterProcessor);
