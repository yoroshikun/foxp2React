import { useState, useEffect } from 'react';

const fetchPokemon = async id => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    if (response.status !== 200) {
      throw Error(
        `Looks like there was a problem. Status Code: ${response.status}`,
      );
    }

    const jsonData = response.json();

    const { name, weight, height, stats, types, sprites } = await jsonData;

    const pokemonData = {
      // Deal with the data
      id,
      name,
      weight: (weight / 10).toFixed(1),
      height: (height / 10).toFixed(1),
      stats: stats
        .map(({ base_stat: baseStat, stat: { name: statName } }) => ({
          baseStat,
          name: statName,
        }))
        .reverse(),
      types: types
        .map(({ slot, type: { name: type } }) => ({
          slot,
          type,
        }))
        .sort((a, b) => a.slot - b.slot),
      sprites: {
        frontDefault: sprites.front_default,
        backDefault: sprites.back_default,
        frontShiny: sprites.front_shiny,
        backShiny: sprites.back_shiny,
      },
    };
    return pokemonData;
  } catch (err) {
    // eslint-disable-next-line
    return console.error(err.message || err);
  }
};

const usePokedex = pokemonID => {
  // State Hooks
  const [cachePokemon, setCachePokemon] = useState({});
  const [pokemon, setPokemon] = useState([]);

  const getPrev = async (prevType, prevID) => {
    if (prevType) {
      if (typeof prevType !== 'object') {
        // Fetch the pokemon info
        const response = await fetchPokemon(prevID);
        // Update the cache
        setCachePokemon({
          ...cachePokemon,
          ...{ [prevID]: response },
        });
        // Return
        return response;
      }
      // Use the cache to fill the pokemon info
      return cachePokemon[prevID];
    }
    return { non_exist: true };
  };

  const getCurr = async (currType, currID) => {
    if (currType) {
      if (typeof currType !== 'object') {
        // Fetch the pokemon info
        const response = await fetchPokemon(currID);
        // Update the cache
        setCachePokemon({
          ...cachePokemon,
          ...{ [currID]: response },
        });
        // Return
        return response;
      }
      // Use the cache to fill the pokemon info
      return cachePokemon[currID];
    }
    return { non_exist: true };
  };

  const getNext = async (nextType, nextID) => {
    if (nextType) {
      if (typeof nextType !== 'object') {
        // Fetch the pokemon info
        const response = await fetchPokemon(nextID);
        // Update the cache
        setCachePokemon({
          ...cachePokemon,
          ...{ [nextID]: response },
        });
        // Return
        return response;
      }
      // Use the cache to fill the pokemon info
      return cachePokemon[nextID];
    }
    return { non_exist: true };
  };

  const updatePokemon = async (updateArr, pokemonIDs) => {
    // Split arrays
    const [prevID, currID, nextID] = pokemonIDs;
    const [prevType, currType, nextType] = updateArr;
    // Promise all so that we will wait for all of them to finish before sending back the result
    const pokemonUpdate = await Promise.all([
      getPrev(prevType, prevID),
      getCurr(currType, currID),
      getNext(nextType, nextID),
    ]);
    // Wait for all
    return pokemonUpdate;
  };

  const checkUpdate = (pokemonIDs, cache) => {
    // Split ID array
    const [prev, curr, next] = pokemonIDs;
    // Array needs to be let just in case it is changed by the conditionals
    // eslint-disable-next-line prefer-const
    let checkArr = [true, true, true];
    // Check if pokemon exists in ID
    if (prev <= 0) {
      checkArr[0] = false;
    }
    if (next >= 803) {
      checkArr[2] = false;
    }
    // Check if pokemon already exists in the cache
    if (prev in cache) {
      checkArr[0] = cache[prev];
    }
    if (curr in cache) {
      checkArr[1] = cache[curr];
    }
    if (next in cache) {
      checkArr[2] = cache[next];
    }
    // Return array based on what needs to update
    return checkArr;
  };

  const pokedexFunction = async () => {
    // Expand the selection
    const pokemonIDs = [pokemonID - 1, pokemonID, pokemonID + 1];
    // Check Cache for pokemon that have already got data
    const updateQueryArr = checkUpdate(pokemonIDs, cachePokemon);
    // Update what is needed
    const pokemonFun = await updatePokemon(
      updateQueryArr,
      pokemonIDs,
      cachePokemon,
      setCachePokemon,
    );
    // SetPokemon
    setPokemon(pokemonFun);
  };

  // Only update when the pokemonID has changed
  useEffect(
    () => {
      // Ensure pokemonID is a thing
      if (pokemonID) {
        pokedexFunction(pokemonID, cachePokemon);
      }
    },
    [pokemonID],
  );

  // Always return pokemon
  return pokemon;
};

export default usePokedex;
