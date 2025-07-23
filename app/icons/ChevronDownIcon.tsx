export default function ChevronDownIcon({ className = "", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-12 h-12 ${className}`}
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
