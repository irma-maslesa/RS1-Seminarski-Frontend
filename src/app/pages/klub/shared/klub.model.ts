import { LoV } from "../../shared/LoV.model";
import { Stadion } from "../../stadion/shared/stadion.model";
import { Trener } from "../../trener/shared/trener.model";

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
    liga: LoV;
}