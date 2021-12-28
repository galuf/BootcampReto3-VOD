import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import VideoRecorder from '../pages/_video';
import HomePage from '../pages/_home';

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/video/:pregunta" element={<VideoRecorder />} />
    </Routes>
  </BrowserRouter>
);

export default Root;
