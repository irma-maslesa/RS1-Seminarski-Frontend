import { Liga } from "../../liga/shared/liga.model";

export class Klub {
    id: number;
    naziv: string;
    mail:string;
    adresa: string;
    slika: string;

    trenerID: number;
    trenerImePrezime: string;
    stadionID: number;
    stadionNaziv: string;
    liga: Liga;
}