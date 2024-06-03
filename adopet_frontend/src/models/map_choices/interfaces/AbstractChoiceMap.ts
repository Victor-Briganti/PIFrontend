export default class AbstractChoiceMap {
  private values: Map<string, string>;

  constructor(values: Map<string, string>) {
    this.values = values;
  }

  getValueByKey(key: string): string | undefined {
    return this.values.get(key);
  }

  getKeyByValue(value: string): string | undefined {
    for (const [keyPair, valuePair] of this.values.entries()) {
      if (value === valuePair) {
        return keyPair;
      }
    }

    return undefined;
  }

  getArray(): [string, string][] {
    return Array.from(this.values, ([key, value]) => {
      return [key, value];
    });
  }
}
