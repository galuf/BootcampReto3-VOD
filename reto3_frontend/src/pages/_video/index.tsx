import { Link, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useQuery } from '@apollo/client';
import Recorder from '../../components/Recorder';
import { QUESTION } from '../../interfaces/index';

const useStyles = makeStyles({
  btn: {
    margin: '10px 100px 0px 100px',
  },
  home: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px',
  },
  move: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const VideoRecorder = () => {
  const { pregunta } = useParams();
  const { data } = useQuery(QUESTION, { variables: { nro: Number(pregunta) } });

  const classes = useStyles();

  return (
    <>
      <h1>Reto 3 Bootcamp Krowdy</h1>

      <div className={classes.home}>
        <Button variant="contained" component={Link} to="/" startIcon={<HomeIcon />}>
          Lista de Videos
        </Button>
      </div>

      <Recorder question={data && data.findPregunta.pregunta} index={Number(pregunta)} />

      <div className={classes.move}>
        <Button
          sx={{ visibility: (Number(pregunta) - 1 > 0 ? 'visible' : 'hidden') }}
          className={classes.btn}
          variant="contained"
          component={Link}
          to={`/video/${Number(pregunta) - 1}`}
          startIcon={<ArrowBackIosIcon />}
        >
          Prev
        </Button>

        <Button
          sx={{ visibility: (Number(pregunta) + 1 <= 4 ? 'visible' : 'hidden') }}
          className={classes.btn}
          variant="contained"
          component={Link}
          to={`/video/${Number(pregunta) + 1}`}
          endIcon={<ArrowForwardIosIcon />}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default VideoRecorder;
