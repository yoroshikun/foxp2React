import * as React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-grid-system';

const Footer = styled.div`
  background-color: #f2f3f5;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 160px;
`;
const Container = styled.div`
  max-width: 968px;
  margin: 0 auto;
`;

const SelectorContainer = styled.div``;

const Button = styled.div`
  text-transform: capitalize;
  display: flex;
  justify-content: right;
  align-content: center;
`;

const PokeSelector = ({ setCurrentPokemonID, prev, next }) => (
  <Footer>
    <Container>
      <Row>
        {prev.sprites && (
          <Col md={6}>
            <SelectorContainer>
              <Button onClick={() => setCurrentPokemonID(prev.id)}>
                {`< ${prev.name}`}
                <img alt="" src={prev.sprites.frontDefault} />
              </Button>
            </SelectorContainer>
          </Col>
        )}
        {!prev.sprites && <Col md={6} />}
        {next.sprites && (
          <Col md={6}>
            <SelectorContainer>
              <Button onClick={() => setCurrentPokemonID(next.id)}>
                <img alt="" src={next.sprites.frontDefault} />
                <p>{`${next.name} >`}</p>
              </Button>
            </SelectorContainer>
          </Col>
        )}
      </Row>
    </Container>
  </Footer>
);

export default PokeSelector;
