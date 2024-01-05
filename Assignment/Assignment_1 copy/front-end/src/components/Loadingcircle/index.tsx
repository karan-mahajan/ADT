import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingCircleProps } from '../../utils/types';

function LoadingCircle({ openLoader, className }: LoadingCircleProps) {
  return (
    <div>
      <Backdrop open={openLoader} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress className={className} />
      </Backdrop>
    </div>
  );
}

export default LoadingCircle;
