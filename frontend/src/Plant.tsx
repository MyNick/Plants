import { Box, Button, IconButton, Paper } from "@mui/material";
import { Create, WaterDrop } from '@mui/icons-material';
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
    lastWatering: number;
    wateringTime: number;
    wateringPeriod: number;
    wateringPeriod_units: number;
}

export default function Plant(props: PlantProps) {
    const { setNotification } = useOutletContext<OutletContext>();
    const {onEdit} = props;
    const {id, name, lastWatering, wateringTime, wateringPeriod, wateringPeriod_units} = props.data;
    const lastWateringString = new Date(lastWatering).toLocaleString();

    const { mutate: water } = useMutation(
        () =>
          axios.post(`${API_URL}/water/${id}`, {
            name: name,
          }),
        {
          onSuccess: () => {
            setNotification({ message: 'Requested', type: 'success' });
          },
          onError: () => {
            setNotification({ message: 'Error requesting water', type: 'error' });
          }
        },
      );

    return (
        <Paper
            elevation={4}
            sx={{
                minWidth: 300,
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ marginX: 'auto' }}> <h1> {name} </h1> </Box>
            {wateringTime/1000} seconds every {wateringPeriod} {wateringPeriod_units}.
            <br/>
            {lastWateringString}.
            <Box sx={{ marginX: 'auto' }}>
                <IconButton color="info" onClick={water}>
                    <WaterDrop/>
                </IconButton>
                <IconButton color="secondary" onClick={() => onEdit(props.data)}>
                    <Create/>
                </IconButton>
            </Box>
        </Paper>
    );
}

function setNotification(arg0: { message: string; type: string; }) {
    throw new Error("Function not implemented.");
}
