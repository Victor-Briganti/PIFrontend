import ModelState from "./State";
import { validatedName } from "../utils/Verification";

export default class ModelCity {
  private name!: string;
  private state!: ModelState;

  constructor(name: string, state: ModelState) {
    if (validatedName(name, 50) === false) {
      throw new Error(`Cidade com nome inválido: ${name}`);
    }

    this.name = name;
    this.state = state;
  }

  getUF(): string {
    return this.state.getUF();
  }

  setUF(uf: string): void {
    this.state.setUF(uf);
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    if (validatedName(name, 50) === false) {
      throw new Error(`Cidade com nome inválido: ${name}`);
    }

    this.name = name;
  }
}
