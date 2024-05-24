import AbstractChoiceMap from "./interfaces/AbstractChoiceMap";

export default class CoatChoiceMap extends AbstractChoiceMap {
  constructor() {
    super(
      new Map([
        ["short", "Curto"],
        ["medium", "Médio"],
        ["long", "Longo"],
      ])
    );
  }
}
