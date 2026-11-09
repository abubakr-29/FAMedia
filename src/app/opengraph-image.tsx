import { ImageResponse } from "next/og";

export const alt =
  "FA Media — Custom web design & development agency for brands worldwide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 85% 15%, rgba(84,210,101,0.25), transparent 45%), #0a0a0a",
          color: "#e7e5e4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#54d265",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 1 }}>
            FA MEDIA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#54d265",
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Beyond Website</span>
            <span>We Build Brand</span>
          </div>
          <div style={{ fontSize: 32, color: "#d6d3d1", maxWidth: 940 }}>
            Custom-coded websites, landing pages &amp; AI chatbots for growing
            brands worldwide.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#a8a29e",
          }}
        >
          <span>USA · UK · Canada · Australia · India</span>
          <span>famedia.co.in</span>
        </div>
      </div>
    ),
    size
  );
}
