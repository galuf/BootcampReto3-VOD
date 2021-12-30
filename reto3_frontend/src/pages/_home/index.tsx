import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import CardVideo from '../../components/CardVideo';
import { ALL_QUESTIONS, Pregunta } from '../../interfaces/index';

const useStyles = makeStyles({
  card_container: {
    display: 'flex',
    justifyContent: 'center',
    height: '60vh',
    marginTop: '55px',
  },
});

const HomePage = () => {
  const { data } = useQuery(ALL_QUESTIONS);
  const classes = useStyles();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const element = window.localStorage.getItem('videos') || '[]';
    const videos = JSON.parse(element);
    setVideos(videos);
  }, []);

  return (
    <>
      <h1>Reto 3 - Bootcamp Krowdy</h1>
      <h2>Video Cuestionario</h2>
      <Box className={classes.card_container}>
        {
          data && data.allPreguntas.map((e: Pregunta) => (
            <CardVideo
              key={e.id}
              indice={e.nro}
              pregunta={e.pregunta}
              status={!!videos[e.nro]}
            />
          ))
        }
      </Box>
    </>
  );
};

export default HomePage;
