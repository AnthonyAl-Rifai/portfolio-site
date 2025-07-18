import { SVGProps } from "react";

interface MenuIconAProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const MenuIconA: React.FC<MenuIconAProps> = ({
  size = 44,
  color = "#231f20",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 44.211 33.027"
    width={size}
    height={size * (33.027 / 44.211)}
    {...props}
  >
    <path
      fill={color}
      d="M39.939,33.027l-4.944-8.064H9.121l-4.945,8.064H0L20.786,0h2.688l20.737,33.027h-4.272ZM22.082,3.984l-11.089,17.954h22.13L22.082,3.984Z"
    />
  </svg>
);

export default MenuIconA;
