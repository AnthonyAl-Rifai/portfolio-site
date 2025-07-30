import { EventProperties, EventType } from '../types/analytics';
import createLogger from '../player/utils/logger';

interface AnalyticsResponse {
  error?: boolean;
}

const log = createLogger('Analytics');

async function track<T extends EventType>(
  event: T,
  properties?: EventProperties[T]
) {
  if (process.env.NODE_ENV === 'development') {
    log.info({ event, properties });
    return Promise.resolve({});
  }
  const response = await fetch('/sbat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      event,
      ...(properties ? { properties } : {}),
    }),
  });
  const bodyResponse: AnalyticsResponse = await response.json();
  return bodyResponse;
}

export default track;
