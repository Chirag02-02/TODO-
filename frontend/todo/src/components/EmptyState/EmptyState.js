import React from "react";
import "./EmptyState.css";

// Shows a placeholder message when no todos exist for the selected date
function EmptyState() {
  return (
    <div className="empty">
      <div className="empty-icon">📋</div>
      Select a date to view tasks
    </div>
  );
}

export default EmptyState;
