import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store';
import { selectPetResults } from '../../store/pet-choice/pet-choice.reducer';
import { Result } from '../../store/pet-choice/pet-choice.model';

interface ChartData {
  name: string;
  y: number;
  color: string;
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  chart: Chart;
  rawData$: Observable<Result[]>;
  constructor( private store: Store<AppState>) {
    this.rawData$ = this.store.select(selectPetResults);
  }

  ngOnInit() {

    this.rawData$
      .subscribe( data => {
        debugger;
      });

    let chart = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        marginRight: 150,
        marginLeft: 50
      },
      title: {
        text: 'Pie Chart'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      // legend: {
      //   layout: 'vertical',
      //   align: 'right',
      //   squareSymbol: true,
      //   symbolHeight: 20,
      //   symbolRadius: 0,
      //   verticalAlign: 'top',
      //   x: 0,
      //   y: 100,
      //   itemMarginBottom: 20
      // },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Pet Choices',
        data: [{
          name: 'horse',
          y: 20,
          color: '#47acb1'
        }, {
          name: 'dog',
          y: 20,
          color: '#f06530'
        }, {
          name: 'cat',
          y: 20,
          color: '#96247a'
        }, {
          name: 'Iguana',
          y: 20,
          color: '#ffcd33'
        }, {
          name: 'fish',
          y: 10,
          color: '#286c4e'
        },
          {
            name: 'other',
            color: '7b7c7c'
          }]
      }]
    });

    this.chart = chart;
  }

}
