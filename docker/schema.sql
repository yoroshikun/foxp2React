/* drop schemas to replace them */
drop schema public cascade;

drop schema private cascade;

/* remove users */
drop user ash;

drop user may;

/* remove roles */
drop role pleb;

drop role admin;

/* create roles */
create role pleb;

create role admin superuser;

/* create users */
create user ash with password 'test';

create user may with password 'test2';

/* grant roles */
grant admin to ash;

grant pleb to may;

/* create a schema */
create schema public;

/* create private schema */
create schema private;

/* IMPORTANT Give people usage on the schemas they need to use! */
grant usage on schema public to may;

grant usage on schema public to ash;

/* typing */
create type trainer_status_t as enum ( 'rookie',
  'pro',
  'master',
  'grandmaster'
);

/* create the tables in public */
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
  pokemon_id smallint references pokemons (id),
  primary key (trainer_id, pokemon_id)
);

/* Create tables in private */
create table secret_stuff (
  user_name text,
  trainer_id integer references trainers (id),
  password text,
  primary key (trainer_id, password)
);

/* Alter table to enable row level security */
alter table secret_stuff enable row level security;

/* Policy that lets everyone see all rows */
create policy all_view on secret_stuff for select using (true);

/* Create a policy so that only uses with the same username can see their password (limited to usernames being unique) */
create policy password_policy on secret_stuff for update using (current_user = user_name);

/* Ash can see all */
create policy ash_sees_all on secret_stuff to ash using (true) with check (true);

/* Grant rights */
grant select, insert, update, delete on secret_stuff to admin;

/* Users can only see certain rows */
grant select (user_name, trainer_id) on secret_stuff to pleb;

/* Users can update their password (but the policy above applies) */
grant update (password) on secret_stuff to pleb;

/* grant usage */
grant usage on secret_stuff to pleb;

grant usage on secret_stuff to admin;

/* initial data */
insert into trainers (name)
    values ('ash');
insert into trainers (name)
    values ('may');
insert into secret_stuff (user_name, trainer_id, password)
    values ('ash', 1, 'test');
insert into secret_stuff (user_name, trainer_id, password)
    values ('may', 2, 'test2');
