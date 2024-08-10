import AbstractChoiceMap from "./interfaces/AbstractChoiceMap";

export default class CoatChoiceMap extends AbstractChoiceMap {
  constructor() {
    super(
      new Map([
        ["short", "Curto"],
        ["average", "Médio"],
        ["long", "Longo"],
      ]),
    );
  }
}
