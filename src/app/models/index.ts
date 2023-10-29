export interface IDataModel {
    acceleration_magnitude: number;
    acceleration_x :  number;
    acceleration_y :  number;
    acceleration_z:  number;
    humidity :  number;
    is_fall_detected : boolean;
    activity_status : "idle" | "walking" | "running" | "falling";
    temperature : number;
    type : "data";
    timestamp : Date;
}

export interface IStatsModel {
    totalRecords: number;
    avgTemp: number;
    avgHumidity: number;
}