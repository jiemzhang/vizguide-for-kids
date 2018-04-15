import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import { AppState } from './store';

import { PetChoiceAddAction } from './store/pet-choice/pet-choice.action';
import {Pet, PetChoice, Result} from './store/pet-choice/pet-choice.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  petChoices$: Observable<Result>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new PetChoiceAddAction({
      person: 'Jie',
      choice: Pet.fish
    }));
  }
}
