export default class AgeChoiceMap {
  private ages: Map<string, string> = new Map([
    ["puppy", "Filhote"],
    ["adult", "Adulto"],
    ["old", "Idoso"],
  ]);

  getValue(key: string): string {
    let retValue = this.ages.get(key);

    if (retValue === undefined) {
      throw new Error("Idade não encontrada");
    }

    return retValue;
  }

  getKey(value: string): string {
    for (let [keyPair, valuePair] of this.ages.entries()) {
      if (value === valuePair) {
        return keyPair;
      }
    }

    throw new Error("Idade não encontrada");
  }

  getArray(): [string, string][] {
    return Array.from(this.ages, ([key, value]) => {
      return [key, value];
    });
  }
}
