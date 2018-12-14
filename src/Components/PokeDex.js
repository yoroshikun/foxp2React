import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-grid-system';

// Styles
const SlantRectangle = styled.div`
  background-color: ${props => props.accentColor || 'red'};
  width: 2500px;
  height: 600px;
  position: absolute;
  z-index: -1;
  transform: rotate(-4.25deg) translateY(-300px) translateX(-350px);
  transform-origin: center;
  transition: background-color 0.375ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const PokemonHeadingName = styled.h1`
  font-size: 2.5rem;
  margin-top: 0;
  color: white;
  text-transform: uppercase;
`;

const Container = styled.div`
  max-width: 968px;
  margin: 8rem auto 0 auto;
`;

const Subheading = styled.p`
  font-size: 0.75rem;
  color: black;
  margin: 0.25rem 0 0.2rem 0;
  text-transform: uppercase;
`;

const Type = styled.p`
  color: ${props => props.color || 'black'};
  font-size: 1.2rem;
  text-transform: capitalize;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

const InfoItem = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0 1rem 0;
`;

const GreenScreen = styled.div`
  background-color: #b1fb93;
  padding: 2rem 2rem 1.25rem 2rem;
  margin-bottom: 2rem;
  border-radius: 6px;
`;

const ProgressBarOuter = styled.div`
  background-color: #f0fcec;
  border-radius: 3px;
  margin-bottom: 0.6rem;
  margin-top: 0.4rem;
`;

const ProgressBarInner = styled.div`
  background-color: #77ccd4;
  color: white;
  width: ${props => props.width || '30%'};
  height: 100%;
  padding: 0.5rem 0rem 0.5rem 0.75rem;
  border-radius: 3px;
`;

const ViewerOuter = styled.div`
  background-color: #f0fcec;
  border-radius: 3px;
  padding: 1.25rem 1.25rem 0.25rem 1.25rem;
  margin-bottom: 2rem;
`;

const ViewerInner = styled.div`
  background-color: #77ccd4;
  text-align: center;
  vertical-align: center;

  > img {
    height: 256px;
    width: 256px;
  }
`;

const ViewerCircle = styled.div`
  margin: 6px 6px 6px 12px;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: #f4504f;

  &:hover {
    background-color: '#b1fb93';
  }
`;

const ViewerLinesContainer = styled.div`
  position: relative;
  float: right;
  top: -32px;
  margin: 6px 12px 6px 6px;
`;

// Mini Component
const ProgressBar = ({ baseStat }) => (
  <ProgressBarOuter>
    <ProgressBarInner width={`${(baseStat / 255) * 100}%`}>
      {baseStat}
    </ProgressBarInner>
  </ProgressBarOuter>
);

const ViewerLines = ({ onClick }) => (
  <ViewerLinesContainer {...{ onClick }}>
    <svg height="25" width="30">
      <line
        x1="2"
        y1="3"
        x2="28"
        y2="3"
        strokeWidth="3px"
        stroke="black"
        strokeLinecap="round"
      />
      <line
        x1="2"
        y1="9"
        x2="28"
        y2="9"
        strokeWidth="3px"
        stroke="black"
        strokeLinecap="round"
      />
      <line
        x1="2"
        y1="15"
        x2="28"
        y2="15"
        strokeWidth="3px"
        stroke="black"
        strokeLinecap="round"
      />
      <line
        x1="2"
        y1="21"
        x2="28"
        y2="21"
        strokeWidth="3px"
        stroke="black"
        strokeLinecap="round"
      />
    </svg>
  </ViewerLinesContainer>
);

const PokeDex = props => {
  const [shiny, setShiny] = useState(false);
  const [back, setBack] = useState(false);
  const [selectedSprite, setSelectedSprite] = useState('');

  const selectSprite = ({ sprites }) => {
    const { backDefault, backShiny, frontDefault, frontShiny } = sprites;
    if (!shiny && !back) {
      setSelectedSprite(frontDefault);
    }
    if (shiny && !back) {
      setSelectedSprite(frontShiny);
    }
    if (!shiny && back) {
      setSelectedSprite(backDefault);
    }
    if (shiny && back) {
      setSelectedSprite(backShiny);
    }
  };

  // Runs only on the current pokemon updating
  useEffect(
    () => {
      const { currentPokemon } = props;
      if (currentPokemon.sprites) {
        selectSprite(currentPokemon);
      }
      setBack(false);
      setShiny(false);
    },
    [props.currentPokemon],
  );
  // Runs if shiny or back has been updated
  useEffect(
    () => {
      const { currentPokemon } = props;
      if (currentPokemon.sprites) {
        selectSprite(currentPokemon);
      }
    },
    [shiny, back],
  );

  // Runs only on mount and dismount (componentWillDismount, componentWillMount)
  useEffect(() => {
    console.log('hi');
    return () => {
      console.log('bye');
    };
  }, []);

  const switchSprite = type => {
    if (type === 'shiny') {
      setShiny(!shiny);
    }
    if (type === 'back') {
      setBack(!back);
    }
  };

  const {
    currentPokemon: { id, name, weight, height, stats, types },
    accentColor,
    typeToColor,
  } = props;

  return (
    <>
      <SlantRectangle accentColor={accentColor} />
      <Container>
        <Row>
          <Col sm={4}>
            <ViewerOuter>
              <ViewerInner>
                <img alt="loading..." src={selectedSprite} />
              </ViewerInner>
              <div>
                <ViewerCircle onClick={() => switchSprite('shiny')} />
                <ViewerLines onClick={() => switchSprite('back')} />
              </div>
            </ViewerOuter>
            <Subheading>TYPE</Subheading>
            {types &&
              types.map(({ type }) => (
                <Type key={type} color={typeToColor(type)}>
                  {type}
                </Type>
              ))}
          </Col>
          <Col sm={8}>
            <PokemonHeadingName>{name}</PokemonHeadingName>
            <GreenScreen>
              <Subheading>NO</Subheading>
              <InfoItem>#{String(id).padStart(3, '0')}</InfoItem>
              <Subheading>WEIGHT</Subheading>
              <InfoItem>{weight}kg</InfoItem>
              <Subheading>HEIGHT</Subheading>
              <InfoItem>{height}m</InfoItem>
            </GreenScreen>
            {stats &&
              stats.map(({ baseStat, name: statName }) => (
                <div key={statName}>
                  <Subheading>{statName}</Subheading>
                  <ProgressBar baseStat={baseStat} />
                </div>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PokeDex;
