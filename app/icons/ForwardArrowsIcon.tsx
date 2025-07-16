import { SVGProps } from "react";

interface ForwardArrowsIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ForwardArrowsIcon: React.FC<ForwardArrowsIconProps> = ({
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
    <path d="M2 6L8 1V5H22V7H8V11L2 6Z" className="cls-1" />
    <path d="M12 6L18 1V5H22V7H18V11L12 6Z" className="cls-1" />
  </svg>
);

export default ForwardArrowsIcon;
