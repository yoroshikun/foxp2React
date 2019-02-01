import { PokemonObject, PokemonTypes, PokemonStats } from '../types';

interface typesArrayObject {
  slot: number;
  type: {
    name: PokemonTypes;
  };
}

interface statsArrayObject {
  base_stat: number;
  stat: {
    name: string;
  };
}

const fetchPokemon = async (id: number): Promise<PokemonObject> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    if (response.status !== 200) {
      throw Error(
        `Looks like there was a problem. Status Code: ${response.status}`,
      );
    }

    const jsonData = response.json();

    const {
      name,
      weight,
      height,
      stats,
      types,
      sprites,
    }: {
      name: string;
      weight: number;
      height: number;
      stats: statsArrayObject[];
      types: typesArrayObject[];
      sprites: { [key: string]: string };
    } = await jsonData;

    const pokemonData: PokemonObject = {
      id,
      name,
      weight: weight,
      height: height,
      stats: stats
        .map(({ base_stat: baseStat, stat: { name: statName } }) => ({
          baseStat,
          name: statName,
        }))
        .reduce(
          (result: PokemonStats, item) => {
            const key: keyof PokemonStats = item.name.replace('-', '_'); //first property: a, b, c
            result[key] = item.baseStat;
            return result;
          },
          {
            hp: 0,
            attack: 0,
            defense: 0,
            special_attack: 0,
            special_defense: 0,
            speed: 0,
          },
        ),
      types: types
        .map(({ slot, type: { name: type } }) => ({
          slot,
          type,
        }))
        .sort(
          (a: { slot: number }, b: { slot: number }): number => a.slot - b.slot,
        )
        .map(({ type }) => type),
      sprites: [
        sprites.front_default,
        sprites.back_default,
        sprites.front_shiny,
        sprites.back_shiny,
      ],
    };
    return Promise.resolve(pokemonData);
  } catch (err) {
    return Promise.reject(err);
  }
};

export default fetchPokemon;
