import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectPetResults } from '../../store/pet-choice/pet-choice.reducer';
import { Result } from '../../store/pet-choice/pet-choice.model';
import { sumBy, findIndex } from 'lodash';

const colorMap = {
  'Horse': '#47acb1',
  'Dog': '#f06530',
  'Cat': '#96247a',
  'Fish': '#ffcd33',
  'Iguana': '#286c4e',
  'Other': '#7b7c7c'
};

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
  options: any;
  rawData$: Observable<Result[]>;
  chart;

  constructor( private store: Store<AppState>) {
    this.rawData$ = this.store.select(selectPetResults);
  }

  ngOnInit() {

    this.init();

    this.rawData$
      .subscribe( (data) => {

        if ( data && data.length) {
          const totalVotes = sumBy(data, 'count');
          const chartData = data.map( item => {
            return {
              name: item.id,
              y: (item.count / totalVotes) * 100,
              count: item.count,
              color: colorMap[item.id]
            };
          });

          chartData.map( datum => {
            const index = findIndex(this.chart.series[0].data, {name: datum.name});
            if (index < 0 ) {
              this.chart.series[0].addPoint(datum, true, false, true);
            } else {
              this.chart.series[0].data[index].update(datum);
            }
          });

        }
      });
  }

  init() {
    this.options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        marginRight: 130,
        marginLeft: 30,
        // height: 350,
        // width: 600
      },
      title: {
        text: 'Pie Chart'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        squareSymbol: true,
        symbolHeight: 20,
        symbolRadius: 0,
        verticalAlign: 'top',
        x: 0,
        y: 40,
        itemMarginBottom: 20
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            distance: 5,
            connectorColor: 'none',
            format: '{point.count}'
          },
          showInLegend: true,
          animation: {
            duration: 1000
          }
        }
      },
      series: [
        {
        name: 'number selected',
        id: 'pieSerie',
        data: [
        //   {
        //   name: 'Horse',
        //   y: 0,
        //   color: '#47acb1'
        // }, {
        //   name: 'Dog',
        //   y: 0,
        //   color: '#f06530'
        // }, {
        //   name: 'Cat',
        //   y: 0,
        //   color: '#96247a'
        // }, {
        //   name: 'Iguana',
        //   y: 0,
        //   color: '#ffcd33'
        // }, {
        //   name: 'Fish',
        //   y: 0,
        //   color: '#286c4e'
        // },
        //   {
        //     name: 'Other',
        //     color: '7b7c7c'
        //   }
          ]
      }]
    };
  }

  saveInstance( chartInstance ) {
    this.chart = chartInstance;
  }
}
