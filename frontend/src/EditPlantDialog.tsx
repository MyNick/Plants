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
    const {name} = plantData;
  
    const handleClose = () => {
      setDialogOpen(false);
    };
    
    const { mutate: save } = useMutation(
      () =>
        axios.put(`${API_URL}/plant`, {
          name: name,
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
  