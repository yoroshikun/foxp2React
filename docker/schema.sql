/* drop tables to replace them */
drop schema public cascade;

create schema public;

/* typing */
create type trainer_status_t as enum ( 'rookie',
  'pro',
  'master',
  'grandmaster'
);

/* create the tables */
create table trainers (
  id serial primary key,
  name varchar(25),
  pokemon_owned smallint[],
  status trainer_status_t
);

create table stats (
  id integer primary key,
  hp smallint,
  attack smallint,
  defense smallint,
  special_attack smallint,
  special_defense smallint,
  speed smallint
);

create table pokemons (
  id smallint constraint real_pokemon check (id < 822
    and id > 0) primary key,
  name text,
  weight integer,
  height integer,
  stats_id integer references stats (id),
  types text[],
  sprites text[]
);

create table trainer_pokemons (
  trainer_id serial references trainers (id),
  pokemon_id integer references pokemons (id),
  primary key (trainer_id, pokemon_id)
);

/* initial data */
insert into trainers (name)
    values ('Ash');
/* give info */
/* insert into trainers
 values ('May');
insert into trainers
 values ('Dawn'); */
/* insert into stats (attack, defence)
 values (50, 20);
insert into pokemons (name, id, stats_id)
 values ('Bulbasaur', 1, 1); */
/* insert into pokemon_stats (pokemon_id, stats_id)
 values (1, 1); */
/* insert into pokemons
 values ('Ivysaur', 2);
insert into pokemons
 values ('Venusaur', 3);
insert into pokemons
 values ('Charmander', 4);
insert into pokemons
 values ('Charmeleon', 5);
insert into pokemons
 values ('Charazard', 6);
insert into trainer_pokemons
 values ('Ash', 2);
insert into trainer_pokemons
 values ('Ash', 3);
insert into trainer_pokemons
 values ('Ash', 6);
insert into trainer_pokemons
 values ('Dawn', 4); */
