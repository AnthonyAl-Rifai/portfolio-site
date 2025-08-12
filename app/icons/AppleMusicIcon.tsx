import { SVGProps } from "react";

interface AppleMusicIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

const AppleMusicIcon: React.FC<AppleMusicIconProps> = ({
  size = 48,
  strokeWidth = 2,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 48 48"
    {...props}
  >
    <defs>
      <style>
        {`.a{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:${strokeWidth};}`}
      </style>
    </defs>
    <path
      d="M17.08 18.25v-7.83a2.16 2.16 0 0 1 1.75-2.13L38 4.54a2.16 2.16 0 0 1 2.58 2.13v7"
      className="a"
    />
    <path
      d="M17.08 19.57a2.16 2.16 0 0 1 1.75-2.13L38 13.69a2.16 2.16 0 0 1 2.58 2.12M40.55 13.65v18.56M17.08 18.25v20.43"
      className="a"
    />
    <circle cx={12.27} cy={38.68} r={4.82} className="a" />
    <circle cx={35.73} cy={32.21} r={4.82} className="a" />
  </svg>
);
export default AppleMusicIcon;
