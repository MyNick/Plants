import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "./App";
import { API_URL } from "./Consts";
import { PlantData } from "./Plant";

interface EditPlantDialogProps {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  plantData: PlantData;
}

export default function EditPlantDialog({
  setDialogOpen,
  plantData,
}: EditPlantDialogProps) {
  const { setNotification } = useOutletContext<OutletContext>();
  const { id } = plantData;
  const [name, setName] = useState<string>(plantData.name);
  const [arduinoPin, setArduinoPin] = useState<number>(plantData.arduinoPin);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const { mutate: save } = useMutation(
    () =>
      axios.put(`${API_URL}/plant`, {
        id,
        name,
        arduinoPin,
      }),
    {
      onSuccess: () => {
        setNotification({ message: "Saved", type: "success" });
        handleClose();
      },
      onError: () => {
        setNotification({ message: "Error updating plant", type: "error" });
      },
    }
  );

  return (
    <Dialog fullWidth open={true} onClose={handleClose}>
      <DialogTitle> Edit {name} </DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          margin="normal"
          sx={{ margin: 2 }}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Select
          label="Arduino Pin"
          variant="outlined"
          value={arduinoPin}
          onChange={(event) => setArduinoPin(event.target.value as number)}
        >
          {[...Array(5).keys()].map((number) => (
            <MenuItem key={number} value={number}>
              {number}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => save()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
