export type PokemonID = number;

export interface PokemonStats {
  [key: string]: number;
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export type PokemonTypes =
  | 'fire'
  | 'normal'
  | 'fighting'
  | 'water'
  | 'flying'
  | 'grass'
  | 'poison'
  | 'electric'
  | 'ground'
  | 'psychic'
  | 'rock'
  | 'ice'
  | 'bug'
  | 'dragon'
  | 'ghost'
  | 'dark'
  | 'steel'
  | 'fairy';

export interface PokemonObject {
  id: PokemonID;
  name: string;
  weight: number;
  height: number;
  types: PokemonTypes[];
  sprites: string[];
  stats: PokemonStats;
}
