export class TmsDictionary<KT, VT> {
  private keys: KT[] = [];
  private values: VT[] = [];
  public constructor() {}

  Add(key: any, value: any) {
    this.keys.push(key);
    this.values.push(value);
  }
  Remove(key: any) {
    const index = this.keys.indexOf(key, 0);
    this.keys.splice(index, 1);
    this.values.splice(index, 1);
  }
  /**获取字典中对应key的值，不存在则返回null */
  TryGetValue(key: KT): VT {
    const index = this.keys.indexOf(key, 0);
    if (index != -1) {
      return this.values[index];
    }
    return null;
  }
  /**判断字典中是否存在对应key的值，返回boolean */
  ContainsKey(key: any): boolean {
    const ks = this.keys;
    for (let i = 0; i < ks.length; ++i) {
      if (ks == key) {
        return true;
      }
    }
    return false;
  }

  SetDicValue(key: any, value: any): boolean {
    const index = this.keys.indexOf(key, 0);
    if (index != -1) {
      this.keys[index] = key;
      this.values[index] = value;
      return true;
    }
    return false;
  }
  GetKeys(): KT[] {
    return this.keys;
  }
  GetValues(): VT[] {
    return this.values;
  }

}
