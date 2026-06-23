import React, { useState } from "react";
import "./FalconMascot.css";

function FalconMascot({ size = 120 }) {
  const [hasError, setHasError] = useState(false);
  const prompt = encodeURIComponent(
    "3D cute mascot of a baby Arabian falcon, chibi style, big expressive friendly eyes, wearing a tiny traditional white Emirati/Saudi ghutra (headscarf) and agal. The falcon is smiling, looking forward. Modern tech aesthetic, soft studio lighting, Pixar style, cinematic rendering, 8k, transparent background, no background",
  );

  return (
    <div
      className={`falcon-mascot ${hasError ? "fallback" : ""}`}
      style={{ width: size, height: size }}
    >
      {hasError ? (
        <div className="falcon-mascot-fallback">
          <span className="falcon-mascot-badge">NoorFalcon</span>
          <strong>Maskot</strong>
        </div>
      ) : (
        <img
          src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=square`}
          alt="NoorFalcon Mascot - Baby Arabian Falcon"
          onError={() => setHasError(true)}
          loading="eager"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "16px",
          }}
        />
      )}
    </div>
  );
}

export default FalconMascot;
