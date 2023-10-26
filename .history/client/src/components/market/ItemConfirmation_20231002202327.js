import React, { useState } from 'react';

import {GiPathDistance} from 'react-icons/gi'
import Nav from 'react-bootstrap/Nav';
import { SlLocationPin } from 'react-icons/sl'
import Tab from 'react-bootstrap/Tab';

function ItemConfirmation({ item }) {
  const [activeTab, setActiveTab] = useState('title');

  return (
    <div className="marketPopup__step">
      <h2 className="marketPopup__step__title">Item Confirmation</h2>
      <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
        <Nav variant="tabs" id="itemTabs">
          <Nav.Item>
            <Nav.Link eventKey="title">Title</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="description">Description</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {
                localStorage.getItem('userType') == 'donee' ? (
                    <Nav.Link eventKey="from"><SlLocationPin/></Nav.Link>
                ) : (
                    <Nav.Link eventKey="pickdrop"><GiPathDistance/></Nav.Link>
                )
            }
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
          <Tab.Pane eventKey="pickdrop">
            <div className="split-screen">
                <div className="split-left">
                <h6>Item Location</h6>
                <p>{item.location}</p>
                </div>
                <div className="split-divider"></div>
                <div className="split-right">
                <h6>Donee's Location</h6>
                <p>{item.donee_location}</p>
                </div>
            </div>
            </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default ItemConfirmation;
