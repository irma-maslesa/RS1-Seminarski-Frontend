export class KlubCreate {
    naziv: string;
    mail:string;
    adresa: string;
    slika: string;

    igraciIds: number[];

    trenerId: number;
    stadionId: number;
    ligaId: number;

    constructor() {
        this.naziv = null;
        this.mail = null;
        this.adresa = null;
        this.slika = null;

        this.igraciIds = null;

        this.trenerId = null;
        this.stadionId = null;
        this.ligaId = null;
    }
}