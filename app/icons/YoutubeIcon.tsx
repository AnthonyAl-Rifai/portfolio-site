import { SVGProps } from "react";

interface YoutubeIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

const YoutubeIcon: React.FC<YoutubeIconProps> = ({
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
      d="M43.112 14.394a5.006 5.006 0 0 0-3.533-3.533c-2.314-.894-24.732-1.332-31.236.025A5.006 5.006 0 0 0 4.81 14.42c-1.045 4.583-1.124 14.491.026 19.177a5.006 5.006 0 0 0 3.533 3.533c4.583 1.055 26.371 1.203 31.236 0a5.006 5.006 0 0 0 3.533-3.533c1.114-4.993 1.193-14.287-.026-19.203Z"
      className="a"
    />
    <path d="M30.567 23.995 20.12 18.004v11.982Z" className="a" />
  </svg>
);
export default YoutubeIcon;
