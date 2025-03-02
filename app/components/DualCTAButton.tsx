import React from "react";

interface DualCTAButtonProps {
  children: [React.ReactNode, React.ReactNode];
}

export default function DualCTAButton({ children }: DualCTAButtonProps) {
  if (!Array.isArray(children) || children.length !== 2) {
    throw new Error("DualCTAButton expects exactly two children");
  }

  return (
    <div className="cta-button-container">
      <div className="dual-button-container">
        {children[0]}
        {children[1]}
      </div>
      <style>{`
        .cta-button-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
        }
        .dual-button-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
}
