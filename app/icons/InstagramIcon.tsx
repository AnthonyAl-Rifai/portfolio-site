import { SVGProps } from "react";

interface InstagramIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const InstagramIcon: React.FC<InstagramIconProps> = ({
  size = 48,
  color = "#000",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_2"
    width={size}
    height={size}
    data-name="Layer 2"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      d="M35.38 10.46a2.19 2.19 0 1 0 2.16 2.22v-.06a2.18 2.18 0 0 0-2.16-2.16Z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M40.55 5.5H7.45a2 2 0 0 0-1.95 2v33.1a2 2 0 0 0 2 2h33.1a2 2 0 0 0 2-2V7.45a2 2 0 0 0-2.05-1.95Z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M24 15.72A8.28 8.28 0 1 0 32.28 24h0A8.28 8.28 0 0 0 24 15.72Z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);
export default InstagramIcon;
