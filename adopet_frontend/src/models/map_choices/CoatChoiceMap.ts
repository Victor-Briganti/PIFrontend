import AbstractChoiceMap from "./interfaces/AbstractChoiceMap";

export default class CoatChoiceMap extends AbstractChoiceMap {
  constructor() {
    super(
      new Map([
        ["short", "Pelo curto"],
        ["average", "Pelo médio"],
        ["long", "Pelo longo"],
      ])
    );
  }
}
