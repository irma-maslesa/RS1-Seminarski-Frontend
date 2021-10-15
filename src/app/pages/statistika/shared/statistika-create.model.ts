import { StatistikaIgracCreate } from "../statistika-igrac/shared/statistika-igrac-create.model";
import { StatistikaKlubCreate } from "../statistika-klub/shared/statistika-klub-create.model"

export class StatistkaCreate {
    statistikaDomacin:StatistikaKlubCreate;
    statistikaGost: StatistikaKlubCreate;

    statistikaDomaciIgraci: StatistikaIgracCreate[];
    statistikaGostujuciIgraci: StatistikaIgracCreate[];

    utakmicaID: number;
    rezultatGost: number;
    rezultatDomacin: number;
  

    constructor() {
        this.statistikaDomacin = null;
        this.statistikaGost = null;

        this.statistikaDomaciIgraci = [];
        this.statistikaGostujuciIgraci = [];

        this.utakmicaID = null;
        this.rezultatDomacin = null;
        this.rezultatGost = null;
    } 
}