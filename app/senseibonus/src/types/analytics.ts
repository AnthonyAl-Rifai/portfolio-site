export enum EventType {
  PageVisitEvent = 'PageVisitEvent',
  LoginAttemptEvent = 'LoginAttemptEvent',
  TrackLoadedEvent = 'TrackLoadedEvent',
  StartTrackEvent = 'StartTrackEvent',
  PlayingTrackEvent = 'PlayingTrackEvent',
  PauseTrackEvent = 'PauseTrackEvent',
  StopTrackEvent = 'StopTrackEvent',
  SeekingTrackEvent = 'SeekingTrackEvent',
  SeekedTrackEvent = 'SeekedTrackEvent',
  SkipForwardTrackEvent = 'SkipForwardTrackEvent',
  SkipBackwardTrackEvent = 'SkipBackwardTrackEvent',
  ScrubbingTrackEvent = 'ScrubbingTrackEvent',
  ScrubbedTrackEvent = 'ScrubbedTrackEvent',
  ReversedTrackEvent = 'ReversedTrackEvent',
  RateChangeEvent = 'RateChangeEvent',
  VisibilityChangedEvent = 'VisibilityChangedEvent',
  ErrorEvent = 'ErrorEvent',
  IncompleteTrackEvent = 'IncompleteTrackEvent',
  FinishTrackEvent = 'FinishTrackEvent',
}

export interface CommonTrackProperties {
  session_id: string;
  track_id: string;
  track_title: string;
  track_position: number;
  track_playback_rate: number;
  is_reversed: boolean;
  is_backgrounded: boolean;
}

export interface EventProperties {
  [EventType.PageVisitEvent]: {
    session_id: string;
  };
  [EventType.LoginAttemptEvent]: {
    success: boolean;
  };
  [EventType.TrackLoadedEvent]: CommonTrackProperties & {
    is_preloaded: boolean;
    load_time: number;
  };
  [EventType.StartTrackEvent]: CommonTrackProperties & {
    is_preloaded: boolean;
  };
  [EventType.PlayingTrackEvent]: CommonTrackProperties;
  [EventType.PauseTrackEvent]: CommonTrackProperties;
  [EventType.StopTrackEvent]: CommonTrackProperties;
  [EventType.SeekingTrackEvent]: CommonTrackProperties & {
    seek_rate: number;
    direction: 'forward' | 'reverse';
  };
  [EventType.SeekedTrackEvent]: CommonTrackProperties;
  [EventType.SkipForwardTrackEvent]: CommonTrackProperties;
  [EventType.SkipBackwardTrackEvent]: CommonTrackProperties;
  [EventType.ScrubbingTrackEvent]: CommonTrackProperties;
  [EventType.ScrubbedTrackEvent]: CommonTrackProperties;
  [EventType.ReversedTrackEvent]: CommonTrackProperties & {
    is_reversed: boolean;
  };
  [EventType.RateChangeEvent]: CommonTrackProperties & {
    rate: number;
  };
  [EventType.VisibilityChangedEvent]: CommonTrackProperties;
  [EventType.IncompleteTrackEvent]: CommonTrackProperties;
  [EventType.FinishTrackEvent]: CommonTrackProperties;
  [EventType.ErrorEvent]: CommonTrackProperties & {
    message: string;
  };
}
