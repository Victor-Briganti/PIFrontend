import { StateChoiceMap } from "./choices/ChoicesMap";

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
    this.uf = this.statesMap.getKey(uf);
  }
}
