import React, { SVGProps } from 'react';

interface AccessMoreIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const AccessMoreIcon: React.FC<AccessMoreIconProps> = ({
  size = 48,
  color = '#000',
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
    <style>
      {`.c{fill:none;stroke:${color};stroke-linecap:round;stroke-linejoin:round;stroke-width:${strokeWidth};}`}
    </style>
    <path
      d="m24 18.01 7.04 7.041L24 32.092l-7.04-7.04L24 18.01"
      className="c"
    />
    <path
      d="m21.898 9.452 15.599 15.6L24 38.547 10.503 25.05l7.034-7.033"
      className="c"
    />
    <path
      d="m21.898 3 22.05 22.051L24 45 4.051 25.051l7.034-7.033"
      className="c"
    />
  </svg>
);

export default AccessMoreIcon;
