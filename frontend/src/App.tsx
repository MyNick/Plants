import { createBrowserRouter, Outlet, RouterProvider, useOutletContext} from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { API_URL } from './Consts';
import Notification, { NotificationData } from './Notification';
import { ConfirmProvider } from 'material-ui-confirm';
import Plants from './Plants';

export interface OutletContext {
  setNotification: Dispatch<SetStateAction<NotificationData | null>>;
}


function Layout() {
  const [notification, setNotification] = useState<NotificationData | null>(
    null,
  );
  return (
    <Box width="100%" height="100vh">
      <Outlet context={{ setNotification }} />
      <Notification notification={notification}/>
    </Box>
  );
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Plants />,
        },
      ],
    },
  ]);

  return (
    <ConfirmProvider>
      <RouterProvider router={router} />
    </ConfirmProvider>
  );
}