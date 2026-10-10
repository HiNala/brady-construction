import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Brady Construction — Bay Area remodeling since 1980";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#16130e",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 8,
              backgroundColor: "#d2a867",
              color: "#16130e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            B
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#f7f3ea", fontSize: 26, letterSpacing: "0.08em", fontWeight: 600 }}>
              BRADY
            </span>
            <span style={{ color: "#b08850", fontSize: 14, letterSpacing: "0.3em" }}>
              CONSTRUCTION CO
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ color: "#f7f3ea", fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            Large remodels.
          </span>
          <span style={{ color: "#d2a867", fontSize: 84, lineHeight: 1.02, fontStyle: "italic" }}>
            Wow transformations.
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#a39a87", fontSize: 22 }}>
            Bay Area · Licensed CA #{SITE.license} · Since {SITE.founded}
          </span>
          <span style={{ color: "#d2a867", fontSize: 22 }}>bradyremodel.com</span>
        </div>
      </div>
    ),
    size
  );
}
