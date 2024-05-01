export default class GenderChoiceMap {
  private genders: Map<string, string> = new Map([
    ["M", "Macho"],
    ["F", "Fêmea"],
  ]);

  getValue(key: string): string {
    let retValue = this.genders.get(key);

    if (retValue === undefined) {
      throw new Error("Genêro não encontrado");
    }

    return retValue;
  }

  getKey(value: string): string {
    for (let [keyPair, valuePair] of this.genders.entries()) {
      if (value === valuePair) {
        return keyPair;
      }
    }

    throw new Error("Genêro não encontrado");
  }

  getArray(): [string, string][] {
    return Array.from(this.genders, ([key, value]) => {
      return [key, value];
    });
  }
}
