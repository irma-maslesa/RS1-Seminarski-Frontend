import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatistikaSezonaKlub } from '../shared/statistika-sezona-klub.model';

@Component({
  selector: 'statistika-sezona-klub-overview',
  templateUrl: './statistika-sezona-klub-overview.component.html',
  styleUrls: ['./statistika-sezona-klub-overview.component.scss']
})
export class StatistikaSezonaKlubOverviewComponent {
  @Input() statistike: StatistikaSezonaKlub[];
  @Output() prikaziGrafove = new EventEmitter();
  
  showStats(statistika) {
    this.prikaziGrafove.emit({...statistika});
  }
}
