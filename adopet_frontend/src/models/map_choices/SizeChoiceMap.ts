import AbstractChoiceMap from "./interfaces/AbstractChoiceMap";

export default class SizeChoiceMap extends AbstractChoiceMap {
  constructor() {
    super(
      new Map([
        ["small", "Pequeno porte"],
        ["medium", "Médio porte"],
        ["large", "Grande porte"],
      ])
    );
  }
}
