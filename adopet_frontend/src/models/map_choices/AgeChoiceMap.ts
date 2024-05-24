import AbstractChoiceMap from "./interfaces/AbstractChoiceMap";

export default class AgeChoiceMap extends AbstractChoiceMap {
  constructor() {
    super(
      new Map([
        ["puppy", "Filhote"],
        ["adult", "Adulto"],
        ["old", "Idoso"],
      ])
    );
  }
}
