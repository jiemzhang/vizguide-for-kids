export enum Pet {
  horse = 'Horse',
  dog = 'Dog',
  cat = 'Cat',
  fish = 'Fish',
  iguana = 'Iguana',
  other = 'Other'
}

/**
 * a person's pet choice
 */
export interface PetChoice {
  // we use person's name as identifier, assume they are unique.
  // if needed, create Person interface to store unique id, and update type of person.
  person: string;
  choice: Pet;
}

/**
 * aggregated result of everybody's pet choice.
 */
export interface Result {
  id: Pet;            // id of the pets. defined in pet enum
  count: number;     // how many people choose it
  voters: string[];   // people who chose it
}

export interface PetChoiceState {
  results: Result[]
}
