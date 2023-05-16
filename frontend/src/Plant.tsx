import { Box, Paper } from "@mui/material";

export interface PlantData {
    name: string;
    lastWatering: number;
    wateringTime: number;
    wateringPeriod: number;
    wateringPeriod_units: number;
}

export default function Plant(props: PlantData) {
    const {name, lastWatering, wateringTime, wateringPeriod, wateringPeriod_units} = props;
    const lastWateringString = new Date(lastWatering).toString();
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
            {name} is watered for {wateringTime/1000} seconds every {wateringPeriod} {wateringPeriod_units}.
            <br/>
            Last watering was done at {lastWateringString}.
        </Paper>
    );
}