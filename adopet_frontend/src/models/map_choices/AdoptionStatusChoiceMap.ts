import AbstractChoiceMap from "./interfaces/AbstractChoiceMap";

export default class AdoptionStatusChoiceMap extends AbstractChoiceMap {
  constructor() {
    super(
      new Map([
        ["approved", "Aprovado"],
        ["rejected", "Rejeitado"],
        ["pending", "Pendente"],
      ])
    );
  }
}
