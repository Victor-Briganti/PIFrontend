export default class MapBaseChoice {
  private values: Map<string, string>;

  constructor(values: Map<string, string>) {
    this.values = values;
  }

  getValue(key: string): string {
    const retValue = this.values.get(key);

    if (retValue === undefined) {
      throw new Error("Valor não encontrada");
    }

    return retValue;
  }

  getKey(value: string): string {
    for (const [keyPair, valuePair] of this.values.entries()) {
      if (value === valuePair) {
        return keyPair;
      }
    }

    throw new Error("Valor não encontrado");
  }

  getArray(): [string, string][] {
    return Array.from(this.values, ([key, value]) => {
      return [key, value];
    });
  }
}
