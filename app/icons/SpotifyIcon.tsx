import { SVGProps } from 'react';

interface SpotifyIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const SpotifyIcon: React.FC<SpotifyIconProps> = ({
  size = 48,
  color = '#000',
  strokeWidth = 2,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="b"
    width={size}
    height={size}
    viewBox="0 0 48 48"
    {...props}
  >
    <defs>
      <style>
        {`.c{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:${strokeWidth};}`}
      </style>
    </defs>
    <circle cx={24} cy={24} r={21.5} className="c" />
    <path
      d="M12.333 30.67c8.19-1.872 15.215-1.066 20.882 2.397m-21.648-8.786c7.808-2.37 17.515-1.222 24.152 2.856M10.35 17.32c7.595-2.305 20.22-1.86 28.198 2.876"
      className="c"
    />
  </svg>
)
export default SpotifyIcon
