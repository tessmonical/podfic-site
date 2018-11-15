import React from 'react'

export default ({ children, hoverText, right }) => (
  <div className="tooltip">
  {children}
    <div className={`tooltip-text${right ? " right" : ""}`}>
    {hoverText}
    </div>
  </div>
);
