import React, { useState } from 'react';

import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

function ItemConfirmation({ item }) {
  const [activeTab, setActiveTab] = useState('title');
  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="marketPopup__step">
      <h2 className="marketPopup__step__title">Item Confirmation</h2>
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
        <Nav.Item>
          <Nav.Link eventKey="title">Title</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="description">Description</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="from">From</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="title">
          <p>{item.title}</p>
        </Tab.Pane>
        <Tab.Pane eventKey="description">
          <p>{item.description}</p>
        </Tab.Pane>
        <Tab.Pane eventKey="from">
          <p>{item.location}</p>
        </Tab.Pane>
      </Tab.Content>
    </div>
  );
}

export default ItemConfirmation;
