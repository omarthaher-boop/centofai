import { useEffect, useState } from "react";

const STORAGE_KEY = "centofai_banner_dismissed";
const BANNER_HEIGHT = 40;

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const isDismissed = localStorage.getItem(STORAGE_KEY) === "true";
    setDismissed(isDismissed);
  }, []);

  const handleClose = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  return (
    <>
      <style>{`
        @keyframes centofai-banner-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes centofai-banner-slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .centofai-banner-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #CECBF6;
          animation: centofai-banner-pulse 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .centofai-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          background: #2D1F5E;
          border-bottom: 0.5px solid rgba(206,203,246,0.25);
          padding: 10px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          animation: centofai-banner-slideDown 0.4s ease;
          transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
          overflow: hidden;
        }
        .centofai-banner.centofai-banner-hidden {
          max-height: 0;
          opacity: 0;
          padding: 0 24px;
          border-bottom: none;
        }
        .centofai-banner-close {
          font-size: 18px;
          color: #7F77DD;
          background: none;
          border: none;
          cursor: pointer;
          line-height: 1;
          padding: 0 0 0 16px;
          flex-shrink: 0;
        }
        .centofai-banner-close:hover {
          color: #EEEDFE;
        }
      `}</style>
      <div className={`centofai-banner${dismissed ? " centofai-banner-hidden" : ""}`}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="centofai-banner-dot" />
          <span style={{ fontSize: 13, color: "#AFA9EC" }}>
            ✨ Die Zukunft Ihrer digitalen Lösung beginnt hier. centof.ai{" "}
            <span style={{ color: "#EEEDFE", fontWeight: 500 }}>
              startet bald
            </span>{" "}
            — machen Sie sich jetzt mit unseren Services vertraut.
          </span>
        </div>
        <button
          type="button"
          className="centofai-banner-close"
          onClick={handleClose}
          aria-label="Banner schließen"
        >
          ×
        </button>
      </div>
      <div
        style={{
          height: dismissed ? 0 : BANNER_HEIGHT,
          transition: "height 0.3s ease",
        }}
      />
    </>
  );
}
