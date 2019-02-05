import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { ALL_TRAINERS } from '../api/Querys';

const TrainerSelector = (props: any) => {
  const { data, error } = useQuery(ALL_TRAINERS);

  if (error) {
    return <div>{error}</div>;
  }

  console.log(data);

  const trainerList = data.allTrainers.edges.map((trainer: any) => (
    <li
      onClick={e => props.handleTrainerClick(trainer.node.id, e)}
      key={trainer.node.id}
    >
      {trainer.node.name}
    </li>
  ));

  return <ul>{trainerList}</ul>;
};

export default TrainerSelector;
