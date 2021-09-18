export class SezonaCreate {
    datumPocetka: Date;
    datumZavrsetka: Date;
    ligaId: number;

    constructor() {
        this.datumPocetka = null;
        this.datumZavrsetka = null;
        this.ligaId = null;
    }
}