import { useEffect, useRef, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useQuery } from '@apollo/client';
import { QUESTION } from '../interfaces/index';
import Status from './Status';

const Recorder = ({ question }: any) => {
  const { data } = useQuery(QUESTION, { variables: { nro: question } });
  const [status, setStatus] = useState(false);
  const [videos, setVideos] = useState({});
  const [src, setSrc] = useState('');
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [btnRecord, setBtnRecord] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<any>();
  const [recordedBlobs, setrecordedBlobs] = useState<any[]>([]);

  const ref = useRef<any|null>(null);
  const refButton = useRef<any|null>(null);
  const refRecord = useRef<any|null>(null);

  const handleSuccess = (stream: MediaStream | null) => {
    window.stream = stream;
    ref.current.srcObject = stream;
  };

  async function init(constraints:any) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
      setError(false);
    } catch (e:any) {
      setError(true);
      setMessageError(`navigator.getUserMedia error:${e.toString()}`);
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
    // console.log('Desde start Recording Options', options);
    let mediaRecorderInit:any;
    try {
      // console.log('Crea un media recorder instancia');
      mediaRecorderInit = new MediaRecorder(window.stream, options);
      setMediaRecorder(mediaRecorderInit);
      setError(false);
    } catch (e) {
      // console.error('Exception while creating MediaRecorder:', e);
      setError(true);
      setMessageError(`Exception while creating MediaRecorder: ${JSON.stringify(e)}`);
      return;
    }

    // console.log('Created MediaRecorder', mediaRecorderInit, 'with options', options);

    refRecord.current.textContent = 'Stop Recording';
    mediaRecorderInit.onstop = (event) => {
      // console.log('Recorder stopped: ', event);
      // console.log('Recorded Blobs: ', recordedBlobs);
    };
    mediaRecorderInit.ondataavailable = handleDataAvailable;
    mediaRecorderInit.start();
    // console.log('MediaRecorder started', mediaRecorderInit);
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
      refButton.current.src = null;
      refButton.current.srcObject = null;
      refButton.current.src = src;
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
      const videos_ = { ...videos, [String(question)]: url };
      window.localStorage.setItem('videos', JSON.stringify(videos_));
      setStatus(true);
    }
  }, [recordedBlobs]);

  useEffect(() => {
    _handleActiveCamare();

    const elemnts = window.localStorage.getItem('videos') || '{}';
    const videos = JSON.parse(elemnts);
    setVideos(videos);
    if (videos[String(question)]) {
      ref.current.hidden = true;
      refButton.current.hidden = false;
      setStatus(true);
      setSrc(videos[String(question)]);
    } else {
      setStatus(false);
      setSrc('');
      ref.current.hidden = false;
      refButton.current.hidden = true;
    }
  }, [question]);

  return (
    <div id="container">
      {
        btnRecord
            && (
            <div id="rec">
              <div>[</div>
              <div id="point" />
              <div>REC]</div>
            </div>
            )
      }
      <video id="gum" ref={ref} playsInline autoPlay muted />
      <video id="recorded" ref={refButton} playsInline />
      {
        data && (
          <div id="question">
            <p>{ data.findPregunta.pregunta }</p>
          </div>
        )
      }
      <button id="record" onClick={_handleRecord} ref={refRecord}>
        <RadioButtonCheckedIcon sx={{ color: 'red' }} />
        Grabar
      </button>
      {
        status && (
        <button id="play" onClick={_handlePlayRecord}>
          <PlayArrowIcon sx={{ fontSize: 30, color: 'white' }} />
        </button>
        )
        }

      <Status status={status} />
    </div>
  );
};

export default Recorder;
