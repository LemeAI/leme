import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const SPOKE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: 12 + radius * Math.cos(rad), y: 12 + radius * Math.sin(rad) };
}

function WheelMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill="#ffffff" />
      {SPOKE_ANGLES.map((angle) => {
        const inner = polar(angle, 2.5);
        const outer = polar(angle, 8);
        return (
          <line
            key={`spoke-${angle}`}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        );
      })}
      {SPOKE_ANGLES.map((angle) => {
        const rim = polar(angle, 8);
        const tip = polar(angle, 9.6);
        return (
          <line
            key={`handle-${angle}`}
            x1={rim.x}
            y1={rim.y}
            x2={tip.x}
            y2={tip.y}
            stroke="#ffffff"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export function renderOgImage(description: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 50% 118%, rgba(255,106,0,0.40) 0%, rgba(255,106,0,0) 62%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <WheelMark size={78} />
          <span
            style={{
              fontSize: 86,
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "-0.04em",
            }}
          >
            Leme
          </span>
        </div>
        <p
          style={{
            fontSize: 34,
            color: "#a1a1a6",
            textAlign: "center",
            marginTop: 34,
            maxWidth: 860,
            lineHeight: 1.4,
            letterSpacing: "-0.015em",
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: "flex",
            width: 64,
            height: 3,
            marginTop: 52,
            backgroundColor: "#ff6a00",
          }}
        />
      </div>
    ),
    { ...OG_SIZE },
  );
}
