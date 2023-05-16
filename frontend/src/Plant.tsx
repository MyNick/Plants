export interface PlantData {
    name: string;
    lastWatering: number;
    wateringTime: number;
    wateringPeriod: number;
    wateringPeriod_units: number;
}

export default function Plant(props: PlantData) {
    const {name, lastWatering, wateringTime, wateringPeriod, wateringPeriod_units} = props;
    return <>
        <h1> {name} </h1>
        {name} is watered every {wateringPeriod} {wateringPeriod_units} for {wateringTime / 1000} seconds.
        The last watering was at {lastWatering}
    </>
}