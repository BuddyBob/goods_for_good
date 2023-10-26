function StatusComponent({ item }) {
    const statusColorMap = {
      'available': 'green',
      'in_progress': 'blue',
      'needs_delivery': 'yellow',
    };
  
    const border = `2px solid ${statusColorMap[item.status] || 'white'}`;
  
    return (
      <div className="status" style={{ border }}>
        <p className="status-text">
          {item.status === 'needs_delivery'
            ? 'needs delivery'
            : item.status === 'in_progress'
            ? 'in progress'
            : item.status === 'available'
            ? 'available'
            : ''}
        </p>
      </div>
    );
  }
  
  export default StatusComponent;
  