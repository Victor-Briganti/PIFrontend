export default class SpecieChoiceMap {
  private sizes: Map<string, string> = new Map([
    ["small", "Pequeno porte"],
    ["medium", "Médio porte"],
    ["large", "Grande porte"],
  ]);

  getValue(key: string): string {
    let retValue = this.sizes.get(key);

    if (retValue === undefined) {
      throw new Error("Tamano não encontrado");
    }

    return retValue;
  }

  getKey(value: string): string {
    for (let [keyPair, valuePair] of this.sizes.entries()) {
      if (value === valuePair) {
        return keyPair;
      }
    }

    throw new Error("Tamano não encontrado");
  }

  getArray(): [string, string][] {
    return Array.from(this.sizes, ([key, value]) => {
      return [key, value];
    });
  }
}
