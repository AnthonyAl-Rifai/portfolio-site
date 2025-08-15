import createLogger from "../player/utils/logger";
import { EventType, EventProperties } from "../types/analytics";

interface AnalyticsResponse {
  error?: boolean;
}

const log = createLogger("Analytics");

// Analytics disabled - function is now a no-op
async function track<T extends EventType>(
  event: T,
  properties?: EventProperties[T]
) {
  // Log in development for debugging purposes only
  if (process.env.NODE_ENV === "development") {
    log.info({ event, properties });
  }

  // Return resolved promise immediately without making network requests
  return Promise.resolve({});
}

export default track;
