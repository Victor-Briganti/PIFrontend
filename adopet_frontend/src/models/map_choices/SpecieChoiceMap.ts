import AbstractChoiceMap from "./interfaces/AbstractChoiceMap";

export default class SpecieChoiceMap extends AbstractChoiceMap {
  constructor() {
    super(
      new Map([
        ["dog", "Cachorro"],
        ["cat", "Gato"],
      ])
    );
  }
}
