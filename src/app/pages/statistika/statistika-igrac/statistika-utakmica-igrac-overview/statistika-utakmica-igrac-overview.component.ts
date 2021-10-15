import { Component, Input } from '@angular/core';
import { StatistikaIgracUtakmica } from '../shared/statistika-igrac-utakmica.model';

@Component({
  selector: 'statistika-utakmica-igrac-overview',
  templateUrl: './statistika-utakmica-igrac-overview.component.html',
  styleUrls: ['./statistika-utakmica-igrac-overview.component.scss']
})
export class StatistikaUtakmicaIgracOverviewComponent{
  @Input() statistike: StatistikaIgracUtakmica[];
}
