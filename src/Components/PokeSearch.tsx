import React, { useState, Suspense } from 'react';
import styled from 'styled-components';
import KnownPokemon from './KnownPokemon';

// styles
const SearchIDHeading = styled.h1`
  font-size: 0.75rem;
  color: white;
  margin: 2.25rem 0 0rem 0;
`;
const Search = styled.div`
  padding: 0.5rem 0;
`;
const SearchButton = styled.div`
  background-color: #77ccd4;
  color: #ffffff;
  text-align: center;
  border-radius: 6px;
  padding: 0.5rem 0 0.5rem 0;
  margin: 1rem 0;
  font-size: 14px;
  transition: all ease-in 0.175s;
  text-transform: uppercase;
`;
const SearchText = styled.p`
  margin: 0;
  font-size: 0.75rem;
`;
const Input = styled.input.attrs({
  type: 'number',
  size: 24,
  placeholder: '#',
})`
  border-radius: 6px;
  border: 1px;
  box-sizing: border-box;
  transition: all ease-in 0.175s;
  background-color: white;
  padding: 0.5rem 0.25rem 0.5rem 1rem;
  width: 100%;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  font-family: 'Press Start 2P', cursive;
`;

const AllPokemonButton = styled.div`
  background-color: #77ccd4;
  color: #ffffff;
  text-align: center;
  border-radius: 6px;
  padding: 0.5rem 0 0.5rem 0;
  margin: 1rem 0;
  font-size: 14px;
  transition: all ease-in 0.175s;
  text-transform: uppercase;
`;

const KnownPokemonViewBox = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 9999;
`;

const PokeSearch = ({ setCurrentPokemonID }: any) => {
  const [searchId, setSearchId] = useState('');
  const [knownPokemonView, setKnownPokemonView] = useState(false);

  const updateSearchId = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchId(event.currentTarget.value);
  };

  return (
    <Search>
      <SearchIDHeading> Go to ID </SearchIDHeading>
      <Input name="id" value={searchId} onChange={updateSearchId} />
      <SearchButton onClick={() => setCurrentPokemonID(parseInt(searchId, 10))}>
        <SearchText>SEARCH</SearchText>
      </SearchButton>
      <AllPokemonButton onClick={() => setKnownPokemonView(!knownPokemonView)}>
        View Found Pokemon
      </AllPokemonButton>
      {knownPokemonView && (
        <KnownPokemonViewBox>
          <Suspense fallback={<div>Loading...</div>}>
            <KnownPokemon />
          </Suspense>
        </KnownPokemonViewBox>
      )}
    </Search>
  );
};

export default PokeSearch;
