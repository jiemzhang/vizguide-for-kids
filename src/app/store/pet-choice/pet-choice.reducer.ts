import * as petChoice from'./pet-choice.action';
import { Result } from './pet-choice.model';

export const defaultState: Result[] = [];

export function petChoiceReducer(state: Result[] = defaultState, action: petChoice.PetChoiceAddAction) {

  switch (action.type) {
    case petChoice.PET_CHOICE_ADD:

      debugger;
      return action.payload;
    default:
      return state;
  }
}
