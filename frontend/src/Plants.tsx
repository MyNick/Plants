import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./App";
import { API_URL } from "./Consts";
import Plant, {PlantData} from "./Plant";


export default function Plants() {
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
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: 2 }}>
    {plants_list && plants_list.map((plant: PlantData, i) => <Plant key={i} {...plant}/>)}
    </Box>
  );
}