import React from "react";

export default function Loading() {
  return (
    <div className="loading-overlay">
      <img
        src={process.env.PUBLIC_URL + "/images/loading.gif"}
        alt="Loading image"
      />
    </div>
  );
}
