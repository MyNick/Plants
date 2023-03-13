import { Box, Paper, Typography } from '@mui/material';

const plants = ['Cusbara', 'Petruzilia', 'Marva', 'Rozmarin', 'Timin', 'Nana'];

export default function App() {
  return (
    <Box width="100%" height="100vh">
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: 2 }}>
        {plants.map((plant) => {
          return (
            <Paper
              key={plant}
              elevation={4}
              sx={{
                minWidth: 300,
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ marginX: 'auto' }}>{plant}</Box>
              <Box>Here will be the graph</Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}
