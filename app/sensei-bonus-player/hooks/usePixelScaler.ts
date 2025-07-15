import { useViewport, PLAYER_WIDTH } from "../context/ViewportContext";

const usePixelScaler = (px: number) => {
  const { width } = useViewport();

  const ratio = px / PLAYER_WIDTH;

  return width * ratio;
};

export default usePixelScaler;
