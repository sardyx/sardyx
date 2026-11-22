import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SARDYX AI — Full-Stack Software & AI Agency";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#07060D",
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(138, 43, 239, 0.45) 0%, rgba(7, 6, 13, 0.95) 70%)",
          color: "#F5F3FF",
          fontFamily: "sans-serif",
          padding: "60px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Glow Horizon */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "250px",
            background: "radial-gradient(ellipse at 50% 0%, #8A2BEF 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />

        {/* Brand Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "999px",
            backgroundColor: "rgba(138, 43, 239, 0.15)",
            border: "1px solid rgba(138, 43, 239, 0.4)",
            color: "#C4A0FF",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "24px",
          }}
        >
          SOFTWARE · CLOUD POS · AI AUTOMATION
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#FFFFFF",
            maxWidth: "960px",
            marginBottom: "20px",
            letterSpacing: "-0.02em",
          }}
        >
          SARDYX<span style={{ color: "#8A2BEF" }}>.AI</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "26px",
            color: "#B8B3CC",
            maxWidth: "800px",
            lineHeight: 1.4,
            marginBottom: "40px",
          }}
        >
          Engineering Digital Systems That Drive Real Growth (PK · USA · UK)
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            fontSize: "16px",
            color: "#00C0FF",
          }}
        >
          <span>● 12 Core Services</span>
          <span>● Cloud POS & Thermal Billing</span>
          <span>● Autonomous AI Agents</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
