import React, { Suspense, useState } from 'react';
import { Container, Col, Row } from 'react-grid-system';
import { TrainerSelector, TrainersPokemon } from '../Components';
const Trainer = ({ setScreen }: any) => {
  const [selectedTrainer, setSelectedTrainer] = useState(0);

  const handleTrainerClick = (trainerID: number, e: any) => {
    e.preventDefault();
    setSelectedTrainer(trainerID);
  };
  // Trainers
  return (
    <Container>
      <Row>
        <Col
          sm={6}
          style={{ background: '#010D27', height: '100vh', color: 'white' }}
        >
          <div>Select your trainer</div>
          <Suspense fallback={<div>loading...</div>}>
            <TrainerSelector handleTrainerClick={handleTrainerClick} />
          </Suspense>
        </Col>
        <Col sm={6}>
          <div>Pokemon Owned by that trainer appear here</div>
          <Suspense fallback={<div>loading...</div>}>
            <TrainersPokemon trainerID={selectedTrainer} />
          </Suspense>
        </Col>
      </Row>
    </Container>
  );
};

export default Trainer;
