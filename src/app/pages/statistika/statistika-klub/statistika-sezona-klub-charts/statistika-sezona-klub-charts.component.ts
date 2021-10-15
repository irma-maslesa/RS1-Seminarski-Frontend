import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import 'chartjs-plugin-labels';
import { Label } from 'ng2-charts';
import { StatistikaSezonaKlub } from '../shared/statistika-sezona-klub.model';

@Component({
  selector: 'statistika-sezona-klub-charts',
  templateUrl: './statistika-sezona-klub-charts.component.html',
  styleUrls: ['./statistika-sezona-klub-charts.component.scss']
})
export class StatistikaSezonaKlubChartComponent implements OnInit {

  @Input() statistika: StatistikaSezonaKlub;

  @Input() klub: string;

  rezultatiHasData: boolean = false;
  goloviHasData: boolean = false;

  public rezultatiOptions: ChartOptions = {
    title: {
      display: true
    },
    legend: {
      position: 'left',
    },
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: 'white',
        fontSize: 10,
      },
    },
  };
  public rezultatiLabels: Label[] = ['Pobjede', 'Remiji', 'Porazi'];
  public rezultatiData: number[] = [];
  public rezultatiType: ChartType = 'pie';
  public rezultatiLegend = true;
  public rezultatiColors = [
    {
      backgroundColor: ['#1a3469', '#f8d43c', '#d75475'],
    },
  ];

  public goloviOptions: ChartOptions = {
    title: {
      display: true
    },
    legend: {
      position: 'left',
    },
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: 'white',
        fontSize: 10,
      },
    },
  };
  public goloviLabels: Label[] = ['Postignuti golovi', 'Primljeni golovi'];
  public goloviData: number[] = [];
  public goloviType: ChartType = 'doughnut';
  public goloviLegend = true;
  public goloviColors = [
    {
      backgroundColor: ['#1a3469', '#d75475'],
    },
  ];

  ngOnInit(): void {
    this.rezultatiOptions.title.text = "Ishodi utakmica u sezoni " + this.statistika.sezona;
    this.goloviOptions.title.text = "Golovi u sezoni " + this.statistika.sezona;
    this.setRezultatiData(this.statistika);
    this.setGoloviData(this.statistika);
  }

  private setRezultatiData(statistika: StatistikaSezonaKlub) {
    if (statistika.pobjeda == 0 && statistika.poraz == 0 && statistika.remi == 0) {
      this.rezultatiHasData = false;
    }
    else
      this.rezultatiHasData = true;

    this.rezultatiData = [statistika.pobjeda, statistika.poraz, statistika.remi];
  }

  private setGoloviData(statistika: StatistikaSezonaKlub) {
    if (statistika.primljeniGolovi == 0 && statistika.postignutiGolovi == 0) {
      this.goloviHasData = false;
    }
    else
      this.goloviHasData = true;

    this.goloviData = [statistika.postignutiGolovi, statistika.primljeniGolovi];
  }

  downloadCanvas(event, n) {
    var anchor = event.target;

    var context = document.getElementsByTagName('canvas')[n].getContext('2d');
    context.save();
    context.globalCompositeOperation = 'destination-over';
    context.fillStyle = 'white';
    context.fillRect(0, 0, document.getElementsByTagName('canvas')[n].width, document.getElementsByTagName('canvas')[n].height);
    anchor.href = document.getElementsByTagName('canvas')[n].toDataURL();

    if (!n)
      anchor.download = `${this.klub.toLowerCase().split(" ").join("_")}_ishodi_${this.statistika.sezona}.png`;
    else
      anchor.download = `${this.klub.toLowerCase().split(" ").join("_")}_golovi_${this.statistika.sezona}.png`;
  }
}
