export interface IDataModel {
    acceleration_magnitude: number;
    acceleration_x :  number;
    acceleration_y :  number;
    acceleration_z:  number;
    humidity :  number;
    is_fall_detected : boolean;
    temperature : number;
    type : "data";
    timestamp : Date;
}