import StateChoiceMap from "./Choices/StateChoiceMap";

export default class State {
  private statesMap: StateChoiceMap = new StateChoiceMap();
  private uf!: string;

  State(uf: string) {
    this.setUF(uf);
  }

  getUF(): string {
    return this.statesMap.getValue(this.uf);
  }

  setUF(uf: string): void {
    let key: string;
    try {
      key = this.statesMap.getKey(uf);
    } catch (err) {
      console.log(`Estado não definido: ${err}`);
      return;
    }

    this.uf = key;
  }
}
