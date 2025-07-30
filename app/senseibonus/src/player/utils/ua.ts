import { UAParser } from 'ua-parser-js';

const ua = new UAParser();

export const getUserAgent = (useragent?: string) => {
  if (!useragent) {
    try {
      useragent = window.navigator.userAgent;
    } catch {
      useragent = '';
    }
  }
  return ua.setUA(useragent).getResult();
};

export const isMobile = () => {
  const userAgent = getUserAgent();
  let isMobile = false;
  if (userAgent.device.type) {
    if (userAgent.device.type.toLowerCase() === 'mobile' || userAgent.device.type.toLowerCase() === 'tablet') {
      isMobile = true;
    }
  }
  return isMobile;
}

export default getUserAgent;
