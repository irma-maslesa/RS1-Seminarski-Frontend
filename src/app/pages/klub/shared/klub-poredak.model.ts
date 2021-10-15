import { UtakmicaSimple } from "../../utakmica/shared/utakmica-simple.model";

export class KlubPoredak {
    id: number;
    naziv: string;
    slika: string;

    odigraneUtakmice: number;
    pobjede: number;
    porazi: number;
    remi: number;
    postignutiGolovi: number;
    primljeniGolovi: number;
    bodovi: number;

    prethodneUtakmice: UtakmicaSimple[];
    iducaUtakmica: UtakmicaSimple;
}