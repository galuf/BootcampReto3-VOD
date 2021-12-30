import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { statusProps } from '../interfaces';

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

const Status: FC<statusProps> = ({ status }) => {
  const classes = useStyles();

  return (
    <div>
      {
        status
          ? <div className={classes.completed}>Completed</div>
          : <div className={classes.missing}>No Completed</div>
      }
    </div>
  );
};

export default Status;
