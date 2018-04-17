import { Action } from'@ngrx/store';
import {PetChoice} from "./pet-choice.model";

export const PET_CHOICE_ADD = '[PET CHOICE] ADD';

export class PetChoiceAddAction implements Action {

  type = PET_CHOICE_ADD;
  constructor(public payload: PetChoice) {}
}

export type All = PetChoiceAddAction;
