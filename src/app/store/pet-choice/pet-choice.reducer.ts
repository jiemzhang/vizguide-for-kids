import * as petChoice from'./pet-choice.action';
import { PetChoice, Result, Pet } from './pet-choice.model';
import { get, findIndex, cloneDeep } from 'lodash';

export const defaultState: Result[] = [ ];

export function petChoiceReducer(state: Result[] = defaultState, action: petChoice.PetChoiceAddAction) {

  switch (action.type) {
    case petChoice.PET_CHOICE_ADD:

      return addChoice(state, action.payload);
    default:
      return state;
  }
}

const addChoice = function( state, entry: PetChoice) {

  let newState = cloneDeep(state);
  const pet = get(entry, 'choice');
  const person = get(entry, 'person');
  const index = findIndex(state, { id: pet });

  // if not found, add an entry
  if ( index < 0 ) {
      newState.push ({
        id: pet,
        count: 1,
        voters: [ person ]
      });
  } else {
    let foundItem = newState[index];

    // only increment if the person haven't voted.
    if ( get(foundItem, 'voters',[]).indexOf( person ) < 0 ) {
      foundItem.count ++;
      debugger;
      foundItem.voters.push(person);
    }

    newState.splice(index, 1, foundItem);
  }

  return newState;
}


