import * as petChoice from'./pet-choice.action';
import { PetChoice, Result, Pet, PetChoiceState } from './pet-choice.model';
import { get, findIndex, cloneDeep } from 'lodash';
import { createSelector } from '@ngrx/store';
import {AppState} from '../index';

const defaultState: PetChoiceState = {
  results: []
};

export function petChoiceReducer(
  state = defaultState,
  action: petChoice.All) {

  switch (action.type) {
    case petChoice.PET_CHOICE_ADD:
      const newResults = addChoice(state, action.payload);
      return {
        ...state,
        results: newResults
      };
    default:
      return state;
  }
}

const addChoice = function( state, entry: PetChoice) {

  let newResults = cloneDeep(get(state, 'results', []));
  const pet = get(entry, 'choice');
  const person = get(entry, 'person');
  const index = findIndex(newResults, { id: pet });

  // if not found, add an entry
  if ( index < 0 ) {
    newResults.push ({
        id: pet,
        count: 1,
        voters: [ person ]
      });
  } else {
    let foundItem = newResults[index];

    // only increment if the person haven't voted.
    if ( get(foundItem, 'voters',[]).indexOf( person ) < 0 ) {
      foundItem.count ++;
      foundItem.voters.push(person);
    }

    newResults.splice(index, 1, foundItem);
  }

  return newResults;
}

export const selectPetChoice = (state: AppState) => state.petChoice;
export const selectPetResults = createSelector(selectPetChoice, (state: PetChoiceState) => get(state, 'results') );
