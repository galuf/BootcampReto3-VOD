import { Box } from '@mui/material';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import CardVideo from '../../components/CardVideo';
import { ALL_QUESTIONS } from '../../interfaces/index';

const HomePage = () => {
  const { data } = useQuery(ALL_QUESTIONS);

  return (
    <div className="main">
      <h1>Reto 3 - Bootcamp Krowdy</h1>
      <h2>Video Cuestionario</h2>
      <Box className="main_container" display="flex" justifyContent="center" alignItems="center" height="60vh">
        {
          data && data.allPreguntas.map((e: any) => (
            <CardVideo key={e.id} indice={e.nro} pregunta={e.pregunta} />
          ))
        }
      </Box>
    </div>
  );
};

export default HomePage;
