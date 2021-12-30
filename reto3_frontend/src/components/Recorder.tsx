import { useEffect, useRef, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {
  Box, Button, Card, IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import DoneIcon from '@mui/icons-material/Done';
import Timer from './Timer';

const useStyles = makeStyles({

  container: {
    position: 'relative',
  },
  play: {
    borderRadius: '50%',
    height: '45px',
    width: '45px',
    background: 'black',
    marginTop: '10px',
  },
  control: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '20px',
    marginRight: '10px',
  },
  question: {
    backgroundColor: 'azure',
    paddingLeft: '25px',
    marginTop: '0px',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'space-between',
  },
  status: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '15px',
  },
});

const Recorder = ({ question, index }: any) => {
  const [status, setStatus] = useState(false);
  const [videos, setVideos] = useState({});
  const [src, setSrc] = useState('');
  const [btnRecord, setBtnRecord] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<any>();
  const [recordedBlobs, setrecordedBlobs] = useState<any[]>([]);

  const ref = useRef<any|null>(null);
  const refButton = useRef<any|null>(null);
  const refRecord = useRef<any|null>(null);

  const classes = useStyles();

  const handleSuccess = (stream: MediaStream | null) => {
    window.stream = stream;
    ref.current.srcObject = stream;
  };

  async function init(constraints:any) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e:any) {
      console.log(e);
    }
  }

  function handleDataAvailable(event) {
    const aux = [];
    if (event.data && event.data.size > 0) {
      aux.push(event.data);
    }
    setrecordedBlobs((prev) => [...prev, ...aux]);
  }

  function startRecording() {
    setrecordedBlobs([]);
    const options = { mimeType: 'video/webm;codecs=vp9,opus' };
    let mediaRecorderInit:any;
    try {
      mediaRecorderInit = new MediaRecorder(window.stream, options);
      setMediaRecorder(mediaRecorderInit);
    } catch (e) {
      return;
    }
    refRecord.current.textContent = 'Stop Recording';
    mediaRecorderInit.onstop = (event) => { /*  */ };
    mediaRecorderInit.ondataavailable = handleDataAvailable;
    mediaRecorderInit.start();
  }

  function stopRecording() {
    refRecord.current.textContent = 'Grabar';
    refButton.current.hidden = false;
    ref.current.hidden = true;
    mediaRecorder.stop();
  }

  const _handleRecord = () => {
    if (!btnRecord) {
      ref.current.hidden = false;
      refButton.current.hidden = true;
      startRecording();
    } else {
      stopRecording();
    }
    setBtnRecord(!btnRecord);
  };

  const _handlePlayRecord = () => {
    const mimeType = 'video/webm';
    if (src === '') {
      const superBuffer = new Blob(recordedBlobs, { type: mimeType });
      refButton.current.src = null;
      refButton.current.srcObject = null;
      refButton.current.src = window.URL.createObjectURL(superBuffer);
      refButton.current.controls = true;
      refButton.current.play();
    } else {
      const elemnts = window.localStorage.getItem('videos') || '[]';
      const videos = JSON.parse(elemnts);
      refButton.current.src = null;
      refButton.current.srcObject = null;
      refButton.current.src = videos[index];
      refButton.current.controls = true;
      refButton.current.play();
    }
  };

  const _handleActiveCamare = async () => {
    const constraints = {
      audio: {
        echoCancellation: { exact: true },
      },
      video: {
        width: 1280, height: 720,
      },
    };
    await init(constraints);
  };

  useEffect(() => {
    if (recordedBlobs.length !== 0) {
      const mimeType = 'video/webm';
      const superBuffer = new Blob(recordedBlobs, { type: mimeType });
      const url = window.URL.createObjectURL(superBuffer);
      const videos_ = { ...videos, [index]: url };
      window.localStorage.setItem('videos', JSON.stringify(videos_));
      setStatus(true);
    }
  }, [recordedBlobs]);

  useEffect(() => {
    _handleActiveCamare();

    refButton.current.src = null;
    const elemnts = window.localStorage.getItem('videos') || '[]';
    const videos = JSON.parse(elemnts);
    setVideos(videos);
    if (videos[index]) {
      refButton.current.hidden = false;
      ref.current.hidden = true;
      setStatus(true);
      setSrc(videos[index]);
    } else {
      setStatus(false);
      setSrc('');
      ref.current.hidden = false;
      refButton.current.hidden = true;
    }
  }, [index, question]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Card
        className={classes.container}
        sx={{
          width: 700,
          height: 525,
        }}
      >

        {
          btnRecord && <Timer pausa={refRecord} />
        }

        <video id="recorded" ref={refButton} playsInline />
        <video id="gum" ref={ref} playsInline autoPlay muted />

        <div className={classes.question}>
          <p>{ question }</p>
          {
            status && (
              <div className={classes.status}>
                <DoneIcon sx={{
                  color: 'green',
                }}
                />
              </div>
            )
          }
        </div>

        <div className={classes.control}>
          {
          status
          && (
          <IconButton className={classes.play} onClick={_handlePlayRecord}>
            <PlayArrowIcon sx={{ fontSize: 30, color: 'darkgrey' }} />
          </IconButton>
          )
          }

          <Button
            onClick={_handleRecord}
            ref={refRecord}
            variant="outlined"
            sx={{ margin: '10px', marginBottom: '10px' }}
            startIcon={(
              <RadioButtonCheckedIcon
                sx={{ color: 'red' }}
              />
            )}
          >
            Grabar
          </Button>
        </div>

      </Card>
    </Box>
  );
};

export default Recorder;
