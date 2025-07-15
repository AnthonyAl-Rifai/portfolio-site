import { AudioAssets } from "../types/playerTypes";
import logger from "./logger";

export interface AudioBuffers {
  forward: AudioBuffer;
  reversed: AudioBuffer;
}

export interface AudioBlobUrls {
  forward: string;
  reversed: string;
  silent: string;
}

export interface ProcessedAudioAssets {
  buffers: AudioBuffers;
  blobUrls: AudioBlobUrls;
}

class AudioAssetFetcher {
  private audioContext?: AudioContext;

  private bufferMap: Map<string, ProcessedAudioAssets>;

  private pendingRequests: Map<string, Promise<ProcessedAudioAssets>>;

  private log: ReturnType<typeof logger>;

  constructor() {
    this.log = logger("AudioAssetFetcher");
    this.bufferMap = new Map<string, ProcessedAudioAssets>();
    this.pendingRequests = new Map<string, Promise<ProcessedAudioAssets>>();
  }

  private async fetchAndDecodeAudioAssets(
    assets: AudioAssets
  ): Promise<ProcessedAudioAssets> {
    if (!this.audioContext) {
      throw new Error(
        "Unable to fetch and decode without audio context supplied"
      );
    }

    this.log.info("fetching", assets.mp3);
    const [forwardResponse, reversedResponse, silentResponse] =
      await Promise.all([
        fetch(assets.mp3.forward),
        fetch(assets.mp3.reversed),
        fetch(assets.mp3.silent),
      ]);

    this.log.info("converting responses to array buffers");
    const [forwardArrayBuffer, reversedArrayBuffer, silentArrayBuffer] =
      await Promise.all([
        forwardResponse.arrayBuffer(),
        reversedResponse.arrayBuffer(),
        silentResponse.arrayBuffer(),
      ]);

    this.log.info("converting audio buffer to blobs");
    const forwardArrayBlob = new Blob([forwardArrayBuffer], {
      type: "audio/mpeg",
    });
    const reversedArrayBlob = new Blob([reversedArrayBuffer], {
      type: "audio/mpeg",
    });
    const silentAudioBlob = new Blob([silentArrayBuffer], {
      type: "audio/mpeg",
    });

    this.log.info("creating blob urls");
    const forwardAudioBlobUrl = URL.createObjectURL(forwardArrayBlob);
    const reversedAudioBlobUrl = URL.createObjectURL(reversedArrayBlob);
    const silentAudioBlobUrl = URL.createObjectURL(silentAudioBlob);

    this.log.info("decoding audio buffer");
    const [forwardAudioBuffer, reversedAudioBuffer] = await Promise.all([
      this.audioContext.decodeAudioData(forwardArrayBuffer),
      this.audioContext.decodeAudioData(reversedArrayBuffer),
    ]);

    return {
      buffers: {
        forward: forwardAudioBuffer,
        reversed: reversedAudioBuffer,
      },
      blobUrls: {
        forward: forwardAudioBlobUrl,
        reversed: reversedAudioBlobUrl,
        silent: silentAudioBlobUrl,
      },
    };
  }

  public initialize(audioContext: AudioContext) {
    if (this.audioContext) return;
    this.audioContext = audioContext;
  }

  public getAudioAssets(url?: string): ProcessedAudioAssets | undefined {
    if (!url) return;
    return this.bufferMap.get(url);
  }

  public async fetchAudioAssets(
    assets: AudioAssets
  ): Promise<ProcessedAudioAssets> {
    const key = assets.mp3.forward;
    if (this.bufferMap.has(key)) {
      this.log.info("using preloaded buffers");
      return this.bufferMap.get(key)!;
    }

    if (this.pendingRequests.has(key)) {
      this.log.info("awaiting pending request in progress");
      return this.pendingRequests.get(key)!;
    }

    const requestPromise = (async () => {
      const processedAudioAssets = await this.fetchAndDecodeAudioAssets(assets);

      this.bufferMap.set(key, processedAudioAssets);
      this.pendingRequests.delete(key);

      this.log.info("buffers fetched and decoded");

      return processedAudioAssets;
    })();

    this.pendingRequests.set(key, requestPromise);
    return requestPromise;
  }

  public async preloadAssets(assets: AudioAssets): Promise<void> {
    const key = assets.mp3.forward;
    if (!this.bufferMap.has(key) && !this.pendingRequests.has(key)) {
      this.log.info("preloading", key);
      await this.fetchAudioAssets(assets);
    }
  }

  public hasLoaded(url: string): boolean {
    return this.bufferMap.has(url) || this.pendingRequests.has(url);
  }
}

const audioAssetFetcher = new AudioAssetFetcher();

export default audioAssetFetcher;
