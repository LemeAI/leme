type IconProps = { className?: string };

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function UploadIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M12 15.5V4.5" />
      <path d="M8 8.5 12 4.5l4 4" />
      <path d="M4.5 15.5v2.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-2.5" />
    </svg>
  );
}

export function ShareLinkIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M10.5 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1.5 1.5" />
      <path d="M13.5 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1.5-1.5" />
    </svg>
  );
}

export function CollaborateIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M20 11.5a6.5 6.5 0 0 1-6.5 6.5H9l-4 3v-4.1A6.5 6.5 0 0 1 3 11.5 6.5 6.5 0 0 1 9.5 5h4A6.5 6.5 0 0 1 20 11.5Z" />
      <path d="M8.5 10.5h6" />
      <path d="M8.5 13.5h3.5" />
    </svg>
  );
}

export function ControlsIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M4 7.5h4.5M12.5 7.5H20" />
      <path d="M4 16.5h7.5M15.5 16.5H20" />
      <circle cx="10.5" cy="7.5" r="2" />
      <circle cx="13.5" cy="16.5" r="2" />
    </svg>
  );
}
