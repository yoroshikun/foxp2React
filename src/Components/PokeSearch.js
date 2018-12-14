import React, { useState } from 'react';
import styled from 'styled-components';

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
  size: 'Normal',
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

const PokeSearch = ({ updatePokemon }) => {
  const [searchId, setSearchId] = useState('');

  const updateSearchId = event => {
    setSearchId(event.target.value);
  };

  return (
    <Search>
      <SearchIDHeading> Go to ID </SearchIDHeading>
      <Input name="id" value={searchId} onChange={updateSearchId} />
      <SearchButton onClick={() => updatePokemon(searchId)}>
        <SearchText>SEARCH</SearchText>
      </SearchButton>
    </Search>
  );
};

export default PokeSearch;
