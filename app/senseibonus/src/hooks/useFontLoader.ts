import { useEffect, useState } from 'react';
import { HARDWARE_FONT_STYLE, DISPLAY_FONT_STYLE } from '../configs/constants';

const useFontLoader = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      document.fonts.load(HARDWARE_FONT_STYLE),
      document.fonts.load(DISPLAY_FONT_STYLE),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]).then(() => {
      setIsFontLoaded(true);
    });
  }, []);

  return isFontLoaded;
};

export default useFontLoader;
