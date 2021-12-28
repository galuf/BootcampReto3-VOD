import {
  Card, CardActionArea, CardContent, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';

interface Pregunta {
  pregunta: string;
  indice: number;
}

const CardVideo:FC<Pregunta> = ({ pregunta, indice }) => {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const element = window.localStorage.getItem('videos') || '{}';
    const videos = JSON.parse(element);
    if (videos[String(indice)]) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, []);

  return (
    <Link to={`/video/${Number(indice)}`}>
      <Card sx={{ maxWidth: 245, margin: 1 }}>
        <CardActionArea>
          <div className="screen" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {pregunta}
            </Typography>
          </CardContent>
          {
          status ? <div className="completed">Completed</div> : <div className="missing">Missing</div>
        }
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default CardVideo;
