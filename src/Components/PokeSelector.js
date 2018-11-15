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

class PokeSelector extends React.PureComponent {
  render() {
    const {
      updatePokemon,
      prevPokemon: { name: prevName, sprites: prevSprites, id: prevID },
      nextPokemon: { name: nextName, sprites: nextSprites, id: nextID },
    } = this.props;

    return (
      <Footer>
        <Container>
          <Row>
            {prevSprites && (
              <Col md={6}>
                <SelectorContainer>
                  <Button onClick={() => updatePokemon(prevID)}>
                    {`< ${prevName}`}
                    <img alt="" src={prevSprites.frontDefault} />
                  </Button>
                </SelectorContainer>
              </Col>
            )}
            {!prevSprites && <Col md={6} />}
            {nextSprites && (
              <Col md={6}>
                <SelectorContainer>
                  <Button onClick={() => updatePokemon(nextID)}>
                    <img alt="" src={nextSprites.frontDefault} />
                    <p>{`${nextName} >`}</p>
                  </Button>
                </SelectorContainer>
              </Col>
            )}
          </Row>
        </Container>
      </Footer>
    );
  }
}

export default PokeSelector;
