import AbstractChoiceMap from "./interfaces/AbstractChoiceMap";

export default class GenderChoiceMap extends AbstractChoiceMap {
  constructor() {
    super(
      new Map([
        ["M", "Macho"],
        ["F", "Fêmea"],
      ])
    );
  }
}
