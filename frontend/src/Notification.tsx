import { Alert, AlertColor, Snackbar, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';

export interface NotificationData {
  message: string;
  type: AlertColor;
}

interface NotificationProps {
  notification: NotificationData | null;
}

export default function Notification({ notification }: NotificationProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (notification) {
      setOpen(true);
    }
  }, [notification]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <Alert
        onClose={handleClose}
        severity={notification?.type}
        sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
      >
        <Typography fontWeight={500}>{notification?.message}</Typography>
      </Alert>
    </Snackbar>
  );
}
