import { StatistikaIgrac } from "../statistika-igrac/shared/statistika-igrac.model";
import { StatistikaKlub } from "../statistika-klub/shared/statistika-klub.model";

export class Statistika {
  statistikaDomacin: StatistikaKlub;
  statistikaGost: StatistikaKlub;

  statistikaDomaciIgraci: StatistikaIgrac[];
  statistikaGostujuciIgraci: StatistikaIgrac[];

  utakmicaID: number;
  rezultatGost: number;
  rezultatDomacin: number;
}