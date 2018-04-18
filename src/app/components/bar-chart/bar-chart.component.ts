import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectPetResults } from '../../store/pet-choice/pet-choice.reducer';
import { Pet } from '../../store/pet-choice/pet-choice.model';
import { Result } from '../../store/pet-choice/pet-choice.model';
import { find } from 'lodash';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  options: any;
  rawData$: Observable<Result[]>;
  chart;
  availablePets: string[];

  constructor(private store: Store<AppState>) {
    this.rawData$ = this.store.select(selectPetResults);
    const keys = Object.keys(Pet).filter(k => typeof Pet[k as any] === 'string');
    this.availablePets = keys.map(k => Pet[k as any]);
  }

  ngOnInit() {
    this.init();

    this.rawData$
      .subscribe( (data) => {

        if ( data && data.length) {

          const chartData = data.map( item => {
            return {
              name: item.id,
              count: item.count
            };
          });

          const newData = this.availablePets.map( name => {
              const dataWithName = find(chartData, {name: name});
              return (dataWithName) ? dataWithName.count : 0;
            }
          );

          this.chart.series[0].setData(newData);
        }
      });
  }

  init() {
    this.options = {
      chart: {
        type: 'column'
      },
      colors: [
        '#47acb1',
        '#f06530',
        '#96247a',
        '#ffcd33',
        '#286c4e',
        '#7b7c7c'
      ],
      title: {
        text: 'Column chart'
      },
      xAxis: {
        categories: [
          'Horse',
          'Dog',
          'Cat',
          'Fish',
          'Iguana',
          'Other'
        ]
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'Count: <b>{point.y}</b>'
      },
      plotOptions: {
        column: {
          maxPointWidth: 50,
          colorByPoint: true
        }
      },
      series: [{
        name: 'Pets',
        data: [0, 0, 0, 0, 0, 0]
      }]
    };
  }

  saveInstance( chartInstance ) {
    this.chart = chartInstance;
  }

}
