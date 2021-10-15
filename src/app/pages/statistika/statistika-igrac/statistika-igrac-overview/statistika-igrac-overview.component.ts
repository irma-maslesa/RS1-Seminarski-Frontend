import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StatistikaIgrac } from '../shared/statistika-igrac.model';

@Component({
  selector: 'statistika-igrac-overview',
  templateUrl: './statistika-igrac-overview.component.html',
  styleUrls: ['./statistika-igrac-overview.component.scss']
})
export class StatistikaIgracOverviewComponent{
  @Input() statistike: StatistikaIgrac[];

  constructor(private router: Router){}
  handleClick(id){
    this.router.navigateByUrl("igrac/" + id);
  }
}
