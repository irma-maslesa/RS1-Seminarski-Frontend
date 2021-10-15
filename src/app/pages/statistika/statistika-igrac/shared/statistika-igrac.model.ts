import { Utakmica } from "src/app/pages/utakmica/shared/utakmica.model";

export class StatistikaIgrac {
    id:number;
    golovi: number;
    zutiKarton: number;
    crveniKarton: number;
    brojMinuta: number;
    asistencije: number;

    igracId: number;
    igracImePrezime:string;
    igracBrojDresa:number;
}