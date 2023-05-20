import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
  } from '@mui/material';
  import { useMutation, useQuery } from '@tanstack/react-query';
  import axios from 'axios';
  import { Dispatch, SetStateAction, useState } from 'react';
  import { useNavigate, useOutletContext } from 'react-router-dom';
import { OutletContext } from './App';
  import { API_URL } from './Consts';
import { PlantData } from './Plant';
  
  interface EditPlantDialogProps {
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
    plantData: PlantData;
  }
  
  export default function EditPlantDialog({ setDialogOpen, plantData }: EditPlantDialogProps) {
    const { setNotification } = useOutletContext<OutletContext>();
    const [duration, setDuration] = useState<string>(plantData.wateringDuration.toString());
    const [period, setPeriod] = useState<string>(plantData.wateringPeriod.toString());
    const {id, name} = plantData;
  
    const handleClose = () => {
      setDialogOpen(false);
    };
    
    const { mutate: save } = useMutation(
      () =>
        axios.put(`${API_URL}/plant`, {
          id,
          duration,
          period,
        }),
      {
        onSuccess: () => {
          setNotification({ message: 'Saved', type: 'success' });
          handleClose();
        },
        onError: () => {
          setNotification({ message: 'Error updating plant', type: 'error' });
        }
      },
    );
  
    return (
      <Dialog fullWidth open={true} onClose={handleClose}>
        <DialogTitle> Edit {name} </DialogTitle>
        <DialogContent>
          <TextField
            label="Duration"
            variant="outlined"
            size="small"
            margin="normal"
            sx={{margin: 2}}
            value={duration}
            onChange={event => setDuration(event.target.value)}
          />
          <TextField
            label="Period"
            variant="outlined"
            size="small"
            margin="normal"
            value={period}
            onChange={event => setPeriod(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => save()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  