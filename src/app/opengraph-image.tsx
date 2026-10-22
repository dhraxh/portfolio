import { ImageResponse } from "next/og";
import { fullName, portfolio } from "@/data/portfolio";

export const alt = `${fullName} — ${portfolio.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Deterministic "random" star positions so the image is identical on every build.
const stars = Array.from({ length: 90 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { x: r(1) * 1200, y: r(2) * 630, s: r(3) * 2.5 + 1, o: r(4) * 0.6 + 0.2 };
});

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          background: "#0a0a0a",
          color: "white",
          position: "relative",
        }}
      >
        {stars.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: s.s,
              height: s.s,
              borderRadius: 999,
              background: "white",
              opacity: s.o,
            }}
          />
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 26,
            color: "#a7f3d0",
            border: "1px solid rgba(52,211,153,0.3)",
            borderRadius: 999,
            padding: "8px 22px",
            alignSelf: "flex-start",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#34d399" }} />
          {portfolio.status}
        </div>
        <div
          style={{
            fontSize: 150,
            fontWeight: 900,
            letterSpacing: -6,
            lineHeight: 1,
            marginTop: 36,
            textTransform: "uppercase",
            backgroundImage: "linear-gradient(180deg, #ffffff, #71717a)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {fullName}
        </div>
        <div style={{ fontSize: 36, color: "#a1a1aa", marginTop: 28 }}>
          {`${portfolio.role} · NMAM Institute of Technology`}
        </div>
      </div>
    ),
    size,
  );
}
