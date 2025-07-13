import React from "react";

export default function Sidebar() {
  return (
    <div
      className="fixed left-0 z-30 transition-all duration-500 -translate-x-full md:translate-x-0"
      style={{
        top: "var(--layout-size)",
        width: "var(--layout-size)",
        height: `calc(100vh - var(--layout-size))`,
      }}
    />
  );
}
