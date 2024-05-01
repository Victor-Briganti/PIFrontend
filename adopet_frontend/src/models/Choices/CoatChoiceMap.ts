export default class CoatChoiceMap {
  private coats: Map<string, string> = new Map([
    ["short", "Curto"],
    ["medium", "Médio"],
    ["long", "Longo"],
  ]);

  getValue(key: string): string {
    let retValue = this.coats.get(key);

    if (retValue === undefined) {
      throw new Error("Pelagem não encontrada");
    }

    return retValue;
  }

  getKey(value: string): string {
    for (let [keyPair, valuePair] of this.coats.entries()) {
      if (value === valuePair) {
        return keyPair;
      }
    }

    throw new Error("Pelagem não encontrada");
  }

  getArray(): [string, string][] {
    return Array.from(this.coats, ([key, value]) => {
      return [key, value];
    });
  }
}
