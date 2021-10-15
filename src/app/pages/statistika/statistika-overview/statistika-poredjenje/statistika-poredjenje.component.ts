import { Component, Input } from '@angular/core';
import { StatistikaKlub } from '../../statistika-klub/shared/statistika-klub.model';

@Component({
    selector: 'statistika-poredjenje',
    templateUrl: './statistika-poredjenje.component.html',
    styleUrls: ['./statistika-poredjenje.component.scss']
})
export class StatistikaPoredjenjeComponent {
    @Input() domacin: StatistikaKlub;
    @Input() gost: StatistikaKlub;
}
