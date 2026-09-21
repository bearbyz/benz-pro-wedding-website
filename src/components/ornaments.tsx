import type { CSSProperties, ReactNode } from "react";

export function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 250 350"
      fill="none"
      stroke="currentColor"
      strokeWidth=".9"
      aria-hidden="true"
    >
      <path d="M30 343C121 280 153 177 178 22M75 300C84 246 59 211 34 186M108 256C168 242 203 199 218 166M137 187C104 154 98 114 91 78M161 105C190 98 211 67 230 45" />
      {[
        [74, 295, -50],
        [102, 254, 30],
        [130, 204, -28],
        [151, 146, 28],
        [165, 98, -20],
        [180, 40, 32],
        [53, 217, -66],
        [187, 214, 54],
        [115, 148, -46],
        [205, 74, 56],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M0 0C-24-9-32-26-22-52C-1-40 12-19 0 0Z" />
          <path d="M0 0L-22-52M-9-22L-25-30M-9-22L0-38" />
        </g>
      ))}
      <g transform="translate(100 232)">
        <circle r="7" />
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 45})`}>
            <path d="M-5-6C-31-16-24-45-9-32C-4-46 15-41 11-24C28-28 26-9 5-6" />
            <path d="M0-8L-5-29M3-9L12-21" />
          </g>
        ))}
      </g>
      <g transform="translate(174 118) scale(.65)">
        <circle r="8" />
        {Array.from({ length: 7 }, (_, i) => (
          <path
            key={i}
            transform={`rotate(${i * 51.4})`}
            d="M-6-6C-30-15-23-38-9-29C-1-48 18-35 11-22C29-20 24-4 6-6"
          />
        ))}
      </g>
    </svg>
  );
}

export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="156"
      height="30"
      viewBox="0 0 156 30"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M0 15H54M102 15H156M58 15C66 4 70 4 78 15C70 26 66 26 58 15ZM98 15C90 4 86 4 78 15C86 26 90 26 98 15ZM78 15C65-2 90-2 78 15ZM78 15C65 32 90 32 78 15Z" />
      <circle cx="49" cy="15" r="2" />
      <circle cx="107" cy="15" r="2" />
    </svg>
  );
}

export function Icon({
  name,
  className = "",
  style,
}: {
  name: string;
  className?: string;
  style?: CSSProperties;
}) {
  const paths: Record<string, ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    down: <path d="m6 9 6 6 6-6" />,
    map: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 2v6M17 2v6M3 10h18m-14 5h3m4 0h3" />
      </>
    ),
    music: (
      <>
        <path d="M9 18V5l12-3v13M9 9l12-3" />
        <ellipse cx="6" cy="18" rx="3" ry="2" />
        <ellipse cx="18" cy="15" rx="3" ry="2" />
      </>
    ),
    mute: <path d="M11 5 6 9H2v6h4l5 4V5Zm6 4 5 6m0-6-5 6" />,
    welcome: (
      <path d="M4 22V10a8 8 0 0 1 16 0v12M8 22V11a4 4 0 0 1 8 0v11M2 22h20M4 15h4m8 0h4" />
    ),
    procession: (
      <>
        <path d="m8 3 12 7-6 10L2 13 8 3Zm-2 1 10 6M4 9l11 6M9 20l-1 3m6-3 1 3" />
        <path d="m15 2 1-1m5 5 2-1" />
      </>
    ),
    rings: (
      <>
        <circle cx="8" cy="15" r="6" />
        <circle cx="16" cy="15" r="6" />
        <path d="m14 7-3-4 3-2h4l3 2-3 4h-4ZM11 3h10m-7-2 2 6 2-6" />
      </>
    ),
    blessing: (
      <>
        <path d="M2 8c3 0 4 2 6 4l4 3 4-3c2-2 3-4 6-4M2 16c4 0 5 6 10 6s6-6 10-6M8 12l4-4 4 4M10 4l2-2 2 2M12 8V4" />
        <path d="m9 15 3 4 3-4" />
      </>
    ),
    dining: <path d="M3 2v7c0 3 6 3 6 0V2M6 2v21M20 23V2c-7 4-7 12 0 12" />,
    heart: (
      <path d="M12 21S2 15 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 7-10 13-10 13Z" />
    ),
    envelope: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="1" />
        <path d="m2 4 10 9L22 4M2 20l7-9m13 9-7-9" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name] ?? paths.heart}
    </svg>
  );
}
