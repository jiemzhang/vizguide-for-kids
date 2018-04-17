import {petChoiceReducer} from './pet-choice/pet-choice.reducer';
import {PetChoiceState} from './pet-choice/pet-choice.model';

export interface AppState {
  petChoice: PetChoiceState;
}

export const reducers = {
  petChoice: petChoiceReducer
};
