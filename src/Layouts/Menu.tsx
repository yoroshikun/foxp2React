import React, { useState } from 'react';
import { Container, Col, Row } from 'react-grid-system';

const Menu = () => {
  // Menu
  return (
    <Container fluid style={{ overflow: 'hidden' }}>
      <Row>
        <Col sm={6} style={{ background: '#010D27', height: '100vh' }}>
          <button
            onClick={() =>
              window.history.pushState({}, 'Pokedex Page', 'pokedex')
            }
          >
            Fill in your Pokedex!
          </button>
        </Col>
        <Col sm={6}>
          <button>Organize your trainers!</button>
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;
