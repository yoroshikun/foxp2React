import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { ALL_POKEMON_MINI } from '../api/Querys';
import { Container, Row, Col } from 'react-grid-system';

const KnownPokemon = () => {
  const { data, error } = useQuery(ALL_POKEMON_MINI);
  console.log(data);
  if (error) return <div>{`Error! ${error.message}`}</div>;
  return (
    <Container>
      <Row>
        {data.allPokemons.edges.map((pokemon: any) => (
          <Col sm={2} key={pokemon.node.id}>
            <p>
              <span>{pokemon.node.name}</span>
              <span style={{ float: 'right' }}>{pokemon.node.id}</span>
            </p>
            <div style={{ textAlign: 'center' }}>
              <img
                style={{ maxWidth: 100 }}
                alt=""
                src={pokemon.node.sprites[0]}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default KnownPokemon;
