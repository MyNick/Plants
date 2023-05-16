import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./App";
import { API_URL } from "./Consts";
import EditPlantDialog from "./EditPlantDialog";
import Plant, {PlantData} from "./Plant";


export default function Plants() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);
  const { setNotification } = useOutletContext<OutletContext>();
  const { data: plants_list } = useQuery(
    ['plants_list'],
    async () => {
      const { data } = await axios.get(`${API_URL}/plants`);
      return data.plants;
    },
    {
      onError: () => {
        setNotification({ message: `Error fetching plants list`, type: 'error' });
      },
      placeholderData: null,
      initialData: null,
    },
  );

  function editPlant(plant: PlantData) {
    setSelectedPlant(plant)
    setDialogOpen(true);
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: 2 }}>
    {dialogOpen && <EditPlantDialog setDialogOpen={setDialogOpen} plantData={selectedPlant} />}
    {plants_list && plants_list.map((plant: PlantData, i) => <Plant key={i} onEdit={editPlant} data={plant}/>)}
    </Box>
  );
}