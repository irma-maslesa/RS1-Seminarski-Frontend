import { Liga } from "../../liga/shared/liga.model";

export class Utakmica {
    id: number;
    datumOdrzavanja: Date;

    rezultatDomacin: number;
    rezultatGost: number;

    klubDomacinID: number;
    klubDomacinNaziv: string;
    klubDomacinSlika: string;

    klubGostID: number;
    klubGostNaziv: string;
    klubGostSlika: string;

    isZavrsena: boolean;
    isProduzeci: boolean;
    isPoluvrijeme: boolean;
    minutaIgre: number;
    
    liga: Liga
}