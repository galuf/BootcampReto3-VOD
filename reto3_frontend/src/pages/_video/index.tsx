import { Link, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Recorder from '../../components/Recorder';

const VideoRecorder = () => {
  const { pregunta } = useParams();

  return (
    <div className="record">
      <h1>Reto 2 Bootcamp Krowdy</h1>
      <div id="home">
        <Link to="/">
          <button className="btnHome">
            <HomeIcon />
            Lista de Videos
          </button>
        </Link>
      </div>
      <Recorder question={Number(pregunta)} />
      <div id="move">
        {
          Number(pregunta) - 1 > 0 && (
          <Link to={`/video/${Number(pregunta) - 1}`}>
            <button className="back">
              <ArrowBackIosIcon />
              Prev
            </button>
          </Link>
          )
        }
        {
          Number(pregunta) + 1 <= 4 && (
            <Link to={`/video/${Number(pregunta) + 1}`}>
              <button className="next">
                Next
                <ArrowForwardIosIcon />
              </button>
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default VideoRecorder;
