export default class SpecieChoiceMap {
  private species: Map<string, string> = new Map([
    ["dog", "Cachorro"],
    ["cat", "Gato"],
  ]);

  getValue(key: string): string {
    let retValue = this.species.get(key);

    if (retValue === undefined) {
      throw new Error("Espécie não encontrada");
    }

    return retValue;
  }

  getKey(value: string): string {
    for (let [keyPair, valuePair] of this.species.entries()) {
      if (value === valuePair) {
        return keyPair;
      }
    }

    throw new Error("Espécie não encontrada");
  }

  getArray(): [string, string][] {
    return Array.from(this.species, ([key, value]) => {
      return [key, value];
    });
  }
}
