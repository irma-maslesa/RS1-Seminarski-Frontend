import { Component, Input, OnInit } from '@angular/core';
import { IgracSimple } from 'src/app/pages/igrac/shared/igrac-simple.model';
import { StatistikaIgracCreate } from '../shared/statistika-igrac-create.model';

@Component({
  selector: 'statistika-igrac-add-edit-form',
  templateUrl: './statistika-igrac-add-edit-form.component.html',
  styleUrls: ['./statistika-igrac-add-edit-form.component.scss']
})
export class StatistikaIgracAddEditFormComponent {

  @Input() igraci: IgracSimple[];
  @Input() igraciStat: Map<number, StatistikaIgracCreate>;

  clear(id) {
    let stat = this.igraciStat.get(id);

    stat.Asistencije = null;
    stat.BrojMinuta = null;
    stat.CrveniKarton = null;
    stat.Golovi = null;
    stat.ZutiKarton = null;
  }
}
