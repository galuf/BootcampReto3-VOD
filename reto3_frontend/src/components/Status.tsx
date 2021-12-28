import { FC } from 'react';

interface statusProps {
  status: boolean;
}

const Status: FC<statusProps> = ({ status }) => (
  <div>
    {
      status ? <div className="completed">Completed</div> : <div className="missing">No Completed</div>
    }
  </div>
);

export default Status;
