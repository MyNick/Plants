import { Box, Button, IconButton, Paper } from "@mui/material";
import { Create, WaterDrop } from '@mui/icons-material';



export interface PlantData {
    name: string;
    lastWatering: number;
    wateringTime: number;
    wateringPeriod: number;
    wateringPeriod_units: number;
}

export default function Plant(props: PlantData) {
    const {name, lastWatering, wateringTime, wateringPeriod, wateringPeriod_units} = props;
    const lastWateringString = new Date(lastWatering).toLocaleString();
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
                <IconButton color="info">
                    <WaterDrop/>
                </IconButton>
                <IconButton color="secondary">
                    <Create/>
                </IconButton>
            </Box>
        </Paper>
    );
}