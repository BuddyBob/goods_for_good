import React from 'react';

function StatusComponent({ item }) {
  const statusColorMap = {
    'available': 'green',
    'in-progress': 'blue',
    'needs-delivery': 'yellow',
  };

  const backgroundColor = statusColorMap[item.status] || 'white';

  return (
    <div className="status" style={{ backgroundColor }}>
      <p className="status-text">{item.status}</p>
    </div>
  );
}

export default StatusComponent;




