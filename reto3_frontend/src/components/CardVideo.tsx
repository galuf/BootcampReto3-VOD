import {
  Card, CardActionArea, CardContent, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { CardPregunta } from '../interfaces';

const useStyles = makeStyles({
  completed: {
    padding: '15px',
    textAlign: 'right',
    color: 'green',
    fontWeight: 'bold',
  },
  missing: {
    padding: '15px',
    textAlign: 'right',
    color: 'red',
    fontWeight: 'bold',
  },
});

const CardVideo:FC<CardPregunta> = ({ pregunta, indice, status }) => {
  const classes = useStyles();

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
            status
              ? <div className={classes.completed}>Completed</div>
              : <div className={classes.missing}>Missing</div>
          }
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default CardVideo;
