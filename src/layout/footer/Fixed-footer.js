import React from "react";


export function FixedFooter({ component }) {
  return (
    <div className="fixed-footer d-flex flex-row justify-content-between align-content-center">
      {component}
    </div>
  );
}
