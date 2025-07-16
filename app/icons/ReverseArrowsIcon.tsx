import { SVGProps } from "react";

interface ReverseArrowsIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ReverseArrowsIcon: React.FC<ReverseArrowsIconProps> = ({
  size = 24,
  color = "#000",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size * 0.5}
    viewBox="0 0 24 12"
    fill="none"
    {...props}
  >
    <defs>
      <style>{`.cls-1{fill:${color};}`}</style>
    </defs>
    <path d="M22 6L16 1V5H2V7H16V11L22 6Z" className="cls-1" />
    <path d="M12 6L6 1V5H2V7H6V11L12 6Z" className="cls-1" />
  </svg>
);

export default ReverseArrowsIcon;
