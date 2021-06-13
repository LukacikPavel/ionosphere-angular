export class Record {
    constructor(
       public station: string,
       public timeStart: Date,
       public timeEnd: Date,
       public azimuthStart: number,
       public azimuthEnd: number,
       public elevationStart: number,
       public elevationEnd: number
    ){}
}