import { useEffect, useRef, useState } from 'react';

const Timer = ({ pausa }:any) => {
  const [time, setTime] = useState(0);
  const [[minuts, secs], setMinuts] = useState([0, 0]);
  const pointRef = useRef<any|null>(null);

  const zfill = (num:number, fill:number) => {
    const n = String(num).length;
    return '0'.repeat(fill - n > 0 ? fill - n : 0) + String(num);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((t) => t + 1);
      setMinuts([(time + 1) / 60, (time + 1) % 60]);
    }, 1000);

    if ((time + 1) % 2 === 0) {
      pointRef.current.visibility = 'visible';
    } else {
      pointRef.current.visibility = 'hidden';
    }

    if (time === 120) pausa.current.click();

    return () => clearInterval(timerId);
  }, [time]);

  return (
    <div id="rec">
      <div>{`0${Math.floor(minuts)}:${zfill(secs, 2)}/02:00`}</div>
      <div id="recPart">
        <div>[</div>
        <div id="point" ref={pointRef} style={{ visibility: (time % 2 === 0 ? 'visible' : 'hidden') }} />
        <div>REC]</div>
      </div>
    </div>
  );
};

export default Timer;
