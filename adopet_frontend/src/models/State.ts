import { MapStateChoice } from "./map_choices/MapChoices";

export default class ModelState {
  private statesMap: MapStateChoice = new MapStateChoice();
  private uf!: string;

  State(uf: string) {
    this.setUF(uf);
  }

  getUF(): string {
    return this.statesMap.getValueByKey(this.uf);
  }

  setUF(uf: string): void {
    this.uf = this.statesMap.getKeyByValue(uf);
  }
}
