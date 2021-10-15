import { Liga } from "../../liga/shared/liga.model";

export class UtakmicaSimple {
    id: number;
    datumOdrzavanja: Date;

    rezultatDomacin: number;
    rezultatGost: number;

    klubDomacinNaziv: string;
    klubGostNaziv: string;

    klubDomacinId: number;
    klubGostId: number;
}