import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { StatistikaSezonaIgrac } from '../shared/statistika-sezona-igrac.model';


@Component({
  selector: 'statistika-sezona-igrac-overview',
  templateUrl: './statistika-sezona-igrac-overview.component.html',
  styleUrls: ['./statistika-sezona-igrac-overview.component.scss']
})
export class StatistikaSezonaIgracOverviewComponent implements OnChanges {

  @Input() statistike: StatistikaSezonaIgrac[];
  utakmiceHasData = true;

  public utakmiceData: ChartDataSets[] = [];
  public utakmiceLabels: Label[] = [];
  public utakmiceOptions = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          position: 'left',
          ticks: {
            steps: 1,
            stepValue: 1,
            min: 0
          }
        },
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public utakmiceColors: Color[] = [
    { 
      borderColor: 'rgba(26, 52, 105,1)',
      pointBackgroundColor: 'rgba(26, 52, 105,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(26, 52, 105,0.8)'
    },
    { 
      borderColor: 'rgba(113, 63, 128,1)',
      pointBackgroundColor: 'rgba(113, 63, 128,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(113, 63, 128,0.8)'
    },
    { 
      borderColor: 'red',
      pointBackgroundColor: 'rgba(186, 73, 126,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(186, 73, 126,0.8)'
    },
    { 
      borderColor: 'rgba(238, 101, 104,1)',
      pointBackgroundColor: 'rgba(238, 101, 104,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(238, 101, 104,0.8)'
    },
    { 
      borderColor: 'rgba(255, 152, 74,1)',
      pointBackgroundColor: 'rgba(255, 152, 74,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 152, 74,0.8)'
    },
    { 
      borderColor: 'red',
      pointBackgroundColor: 'rgba(248, 212, 60,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(248, 212, 60,0.8)'
    }
  ];
  public utakmiceLegend = true;
  public utakmiceType: ChartType = 'line';

  ngOnChanges(change: SimpleChanges): void {
    let statistike = change.statistike;
    if (!statistike.firstChange) {
      let stats: StatistikaSezonaIgrac[] = statistike.currentValue.reverse();
      this.utakmiceLabels = stats.map(e => e.sezona);
      this.utakmiceData = [
        { data: stats.map(e => e.odigraneUtakmice), label: 'Odigrane utakmice', fill: false },
        { data: stats.map(e => e.brojMinuta), label: 'Prosječno odigranih minuta', fill: false },
        { data: stats.map(e => e.golovi), label: 'Postignuti golovi', fill: false },
        { data: stats.map(e => e.asistencije), label: 'Asistencije', fill: false },
        { data: stats.map(e => e.zutiKarton), label: 'Žuti kartoni', fill: false },
        { data: stats.map(e => e.crveniKarton), label: 'Crveni kartoni', fill: false }]
    }

  }

  downloadCanvas(event) {
    var anchor = event.target;

    var context = document.getElementsByTagName('canvas')[0].getContext('2d');
    context.save();
    context.globalCompositeOperation = 'destination-over';
    context.fillStyle = 'white';
    context.fillRect(0, 0, document.getElementsByTagName('canvas')[0].width, document.getElementsByTagName('canvas')[0].height);
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();

    anchor.download = `_ishodi.png`;

  }
}
