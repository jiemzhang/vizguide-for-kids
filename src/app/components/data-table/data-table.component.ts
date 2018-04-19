import { Component, OnInit } from '@angular/core';
import { selectPetResults } from '../../store/pet-choice/pet-choice.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { get } from 'lodash';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  rawData$;
  rows = [];

  constructor(private store: Store<AppState>) {
    this.rawData$ = this.store.select(selectPetResults);
  }

  ngOnInit() {
    this.rawData$.subscribe( data => {
      this.rows = data.map( datum => {
        return {
          id: datum.id,
          count: datum.count,
          voters: get(datum, 'voters', []).join(', ')
        };
      });
    });
  }
}
