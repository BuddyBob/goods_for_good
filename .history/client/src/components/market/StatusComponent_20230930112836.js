function StatusComponent({ item }) {
    const statusColorMap = {
      'available': '#42f578',
      'in_progress': '#5c8fff',
      'needs_delivery': '#ffce5c',
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
  