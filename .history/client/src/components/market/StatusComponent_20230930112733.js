function StatusComponent({ item }) {
    const statusColorMap = {
      'available': 'green',
      'in_progress': 'blue',
      'needs_delivery': 'yellow',
    };
  
    const statusStyle = {
      backgroundColor: '#eeeeee',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '5px',
      border: `2px solid ${statusColorMap[item.status] || 'white'}`,
    };
  
    const statusTextStyle = {
      fontSize: '15px',
      padding: '10px',
    };
  
    return (
      <div className="status" style={statusStyle}>
        <p className="status-text" style={statusTextStyle}>
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
  