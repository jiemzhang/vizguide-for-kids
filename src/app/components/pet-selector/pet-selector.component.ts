import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import { AppState } from '../../store';
import { FormBuilder } from '@angular/forms';
import { PetChoiceAddAction } from '../../store/pet-choice/pet-choice.action';
import {Pet, Result} from '../../store/pet-choice/pet-choice.model';

interface PetOption {
  key: string;
  display: string;
}

@Component({
  selector: 'app-pet-selector',
  templateUrl: './pet-selector.component.html',
  styleUrls: ['./pet-selector.component.scss']
})
export class PetSelectorComponent implements OnInit {

  selectedPet = '';
  petName = '';
  petOptions: PetOption[] = [];
  petChoices$: Observable<Result>;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {

    for ( var petName in Pet) {
      this.petOptions.push({key: petName, display: Pet[petName]});
    }
  }

  ngOnInit() {

  }

  addPetChoice( ) {
    this.store.dispatch(new PetChoiceAddAction({
      person: this.petName,
      choice: Pet[this.selectedPet]
    }));

    this.petName = '';
    this.selectedPet = '';
  }
}
