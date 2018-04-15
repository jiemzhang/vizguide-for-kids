import { Result } from './pet-choice/pet-choice.model'
import { petChoiceReducer } from './pet-choice/pet-choice.reducer';

export interface AppState {
  petChoiceResults: Result[];
}

export const reducers = {
  petChoices: petChoiceReducer
};
