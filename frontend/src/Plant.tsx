import { Box, Button, IconButton, Paper } from "@mui/material";
import { Create, WaterDrop } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "./Consts";
import { useOutletContext } from "react-router";
import { OutletContext } from "./App";

interface PlantProps {
  data: PlantData;
  onEdit: Dispatch<SetStateAction<PlantData>>;
}
export interface PlantData {
  id: number;
  name: string;
  arduinoPin: number;
}

export default function Plant(props: PlantProps) {
  const { setNotification } = useOutletContext<OutletContext>();
  const { onEdit } = props;
  const { id, name, arduinoPin } = props.data;

  const { mutate: water } = useMutation(
    () =>
      axios.post(`${API_URL}/water/${id}`, {
        id,
        arduinoPin,
      }),
    {
      onSuccess: () => {
        setNotification({ message: "Requested", type: "success" });
      },
      onError: () => {
        setNotification({ message: "Error requesting water", type: "error" });
      },
    }
  );

  return (
    <Paper
      elevation={4}
      sx={{
        minWidth: 300,
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        padding: 4,
      }}
    >
      <Box sx={{ marginX: "auto" }}>
        <h1> {name} </h1>
        <h3> Plant {arduinoPin}</h3>
      </Box>
      <Box sx={{ marginX: "auto" }}>
        <IconButton color="info" onClick={water}>
          <WaterDrop />
        </IconButton>
        <IconButton color="secondary" onClick={() => onEdit(props.data)}>
          <Create />
        </IconButton>
      </Box>
    </Paper>
  );
}

function setNotification(arg0: { message: string; type: string }) {
  throw new Error("Function not implemented.");
}
