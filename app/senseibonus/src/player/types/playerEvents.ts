import EventEmitter from 'events';
import { PlayerState } from './playerStates';

export enum PLAYER_EVENTS {
  setup = 'setup',
  loading = 'loading',
  loaded = 'loaded',
  ready = 'ready',
  play = 'play',
  playing = 'playing',
  pause = 'pause',
  stop = 'stop',
  seeking = 'seeking',
  seeked = 'seeked',
  skipForward = 'skipForward',
  skipBackward = 'skipBackward',
  scrubbing = 'scrubbing',
  scrubbed = 'scrubbed',
  timeupdate = 'timeupdate',
  stateupdate = 'stateupdate',
  reversed = 'reversed',
  ratechange = 'ratechange',
  volumeupdate = 'volumeupdate',
  ended = 'ended',
  error = 'error',
};

export interface PlayerListeners {
  [PLAYER_EVENTS.setup]: VoidFunction;
  [PLAYER_EVENTS.loading]: (url: string) => void;
  [PLAYER_EVENTS.loaded]: (preloaded: boolean) => void;
  [PLAYER_EVENTS.ready]: (url: string) => void;
  [PLAYER_EVENTS.play]: VoidFunction;
  [PLAYER_EVENTS.playing]: VoidFunction;
  [PLAYER_EVENTS.pause]: VoidFunction;
  [PLAYER_EVENTS.stop]: VoidFunction;
  [PLAYER_EVENTS.scrubbing]: VoidFunction;
  [PLAYER_EVENTS.scrubbed]: VoidFunction;
  [PLAYER_EVENTS.skipBackward]: VoidFunction;
  [PLAYER_EVENTS.skipForward]: VoidFunction;
  [PLAYER_EVENTS.seeking]: (data: { rate: number, direction: 'forward' | 'reverse' }) => void;
  [PLAYER_EVENTS.seeked]: VoidFunction;
  [PLAYER_EVENTS.timeupdate]: (position: number) => void;
  [PLAYER_EVENTS.stateupdate]: (data: { state: PlayerState, previousState: PlayerState }) => void;
  [PLAYER_EVENTS.reversed]: (reversed: boolean) => void;
  [PLAYER_EVENTS.ratechange]: (data: number) => void;
  [PLAYER_EVENTS.volumeupdate]: (volume: [number, number]) => void;
  [PLAYER_EVENTS.ended]: (direction: 'forward' | 'reverse') => void;
  [PLAYER_EVENTS.error]: (message: string) => void;
}

export class PlayerEventEmitter<L extends PlayerListeners = PlayerListeners> extends EventEmitter {
  override emit<E extends PLAYER_EVENTS>(event: E, ...args: E extends keyof PlayerListeners ? Parameters<L[E]> : any[]) {
    return super.emit(event, ...args);
  }

  override on<E extends PLAYER_EVENTS>(event: E, listener: E extends keyof PlayerListeners ? L[E] : (...args: any[]) => void) {
    return super.on(event, listener);
  }

  override off<E extends PLAYER_EVENTS>(event: E, listener: E extends keyof PlayerListeners ? L[E] : (...args: any[]) => void) {
    return super.off(event, listener);
  }

  override once<E extends PLAYER_EVENTS>(event: E, listener: E extends keyof PlayerListeners ? L[E] : (...args: any[]) => void) {
    return super.once(event, listener);
  }

  override removeListener<E extends PLAYER_EVENTS>(
    event: E,
    listener: E extends keyof PlayerListeners ? L[E] : (...args: any[]) => void,
  ) {
    return super.removeListener(event, listener);
  }

  override addListener<E extends PLAYER_EVENTS>(
    event: E,
    listener: E extends keyof PlayerListeners ? L[E] : (...args: any[]) => void,
  ) {
    return super.addListener(event, listener);
  }
}
