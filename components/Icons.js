// Inline SVG icon set (stroke-based, theme-aware via currentColor). No emojis.
const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ children, className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      className={className}
      {...s}
      {...props}
    >
      {children}
    </svg>
  );
}

export const Check = (p) => (
  <Svg {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </Svg>
);

export const CheckCircle = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.3l2.4 2.4 4.6-5" />
  </Svg>
);

export const Lock = (p) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.4" />
    <path d="M8 10.5V7.2a4 4 0 0 1 8 0v3.3" />
  </Svg>
);

export const LockOpen = (p) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.4" />
    <path d="M8 10.5V7.2a4 4 0 0 1 7.5-1.9" />
  </Svg>
);

export const Sparkles = (p) => (
  <Svg {...p}>
    <path d="M12 3.5l1.9 4.9 4.9 1.9-4.9 1.9L12 17.1l-1.9-4.9L5.2 10.3l4.9-1.9z" />
    <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
  </Svg>
);

export const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M4.5 12h15" />
    <path d="M13 5.5l6.5 6.5-6.5 6.5" />
  </Svg>
);

export const ArrowLeft = (p) => (
  <Svg {...p}>
    <path d="M19.5 12h-15" />
    <path d="M11 5.5L4.5 12l6.5 6.5" />
  </Svg>
);

export const Play = (p) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M7 5.2c0-.9 1-1.5 1.8-1L19 10.3c.8.5.8 1.7 0 2.2L8.8 18.8c-.8.5-1.8-.1-1.8-1z" />
  </Svg>
);

export const Star = (p) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.6 9.7l5.8-.8z" />
  </Svg>
);

export const Diamond = (p) => (
  <Svg {...p}>
    <path d="M6.5 3.5h11l3 5-8.5 12L3.5 8.5z" />
    <path d="M3.5 8.5h17" />
    <path d="M9 3.5l-1.5 5L12 20.5l4.5-12L15 3.5" />
  </Svg>
);

export const Menu = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const Close = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const Mail = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.4" />
    <path d="M3.6 7l8.4 6 8.4-6" />
  </Svg>
);

export const User = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </Svg>
);

export const Eye = (p) => (
  <Svg {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

export const EyeOff = (p) => (
  <Svg {...p}>
    <path d="M3 3l18 18" />
    <path d="M6.7 6.8C4.2 8.4 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.7 0 3.2-.4 4.5-1.1" />
    <path d="M9.6 9.7a3 3 0 0 0 4.2 4.2" />
    <path d="M9.9 5.8A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5s-.9 1.7-2.6 3.3" />
  </Svg>
);

export const Clock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const Heart = (p) => (
  <Svg {...p}>
    <path d="M12 20.5C12 20.5 3.5 15 3.5 8.9 3.5 6.2 5.6 4.2 8.1 4.2c1.7 0 3.1.9 3.9 2.3.8-1.4 2.2-2.3 3.9-2.3 2.5 0 4.6 2 4.6 4.7 0 6.1-8.5 11.6-8.5 11.6z" />
  </Svg>
);

export const Palette = (p) => (
  <Svg {...p}>
    <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.3 0 2-.9 2-2 0-1.2-1-1.7-1-2.9 0-.9.7-1.6 1.7-1.6H17a3.8 3.8 0 0 0 3.8-3.8c0-3.9-3.9-6.7-8.8-6.7z" />
    <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="9.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="7" r="1" fill="currentColor" stroke="none" />
  </Svg>
);

export const Megaphone = (p) => (
  <Svg {...p}>
    <path d="M3.5 10.5v3l11 4.2V6.3z" />
    <path d="M14.5 8.5l4.5-2.2v11.4l-4.5-2.2" />
    <path d="M6.5 14v3a2 2 0 0 0 4 0v-1.5" />
  </Svg>
);

export const Briefcase = (p) => (
  <Svg {...p}>
    <rect x="3" y="7.5" width="18" height="12.5" rx="2.2" />
    <path d="M8.5 7.5V5.6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.9" />
    <path d="M3 12.5h18" />
  </Svg>
);

export const ChevronDown = (p) => (
  <Svg {...p}>
    <path d="M6 9.5l6 6 6-6" />
  </Svg>
);

export const Compass = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.2 8.8l-1.8 4.4-4.4 1.8 1.8-4.4z" />
  </Svg>
);

export const Leaf = (p) => (
  <Svg {...p}>
    <path d="M5 19c-1-7 4-13 14-13 .6 8-4 14-12 14a6 6 0 0 1-2-1z" />
    <path d="M8.5 16c1.8-3.2 4.4-5.6 7.5-7" />
  </Svg>
);

export const Flower = (p) => (
  <Svg {...p}>
    <path d="M12 6.5c1.5 2.2 1.5 5 0 8-1.5-3-1.5-5.8 0-8z" />
    <path d="M12 14.5C9 13.6 7 11.2 6.4 8.2c3 .6 5 3 5.6 6.3z" />
    <path d="M12 14.5c3-.9 5-3.3 5.6-6.3-3 .6-5 3-5.6 6.3z" />
    <path d="M4.8 13.6c2.2 1 4.7 1.4 7.2 1.4s5-.4 7.2-1.4c-1.2 3-3.9 4.9-7.2 4.9s-6-1.9-7.2-4.9z" />
  </Svg>
);

export const Mirror = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M12 14.5V21M9.5 21h5" />
    <path d="M10 7.2A3 3 0 0 1 12 6.2" />
  </Svg>
);

export const Crown = (p) => (
  <Svg {...p}>
    <path d="M4 17l1.4-8.5 4.1 4L12 6.5l2.5 6 4.1-4L20 17z" />
    <path d="M4.5 17.5h15" />
  </Svg>
);

export const Sun = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" />
  </Svg>
);

export const moduleIcons = {
  sparkles: Sparkles,
  compass: Compass,
  leaf: Leaf,
  sun: Sun,
  flower: Flower,
  mirror: Mirror,
  crown: Crown,
  heart: Heart,
  palette: Palette,
  megaphone: Megaphone,
  briefcase: Briefcase,
};
