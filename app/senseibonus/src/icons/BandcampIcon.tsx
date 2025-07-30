import { SVGProps } from 'react';

interface BandcampIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const BandcampIcon: React.FC<BandcampIconProps> = ({
  size = 48,
  color = '#000',
  strokeWidth = 2,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    data-name="Layer 2"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      d="M16.94 12.49H43.5L31.06 35.51H4.5l12.44-23.02z"
      style={{
        fill: "none",
        stroke: "#000",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    />
  </svg>
)
export default BandcampIcon
