import axios from "axios";
import ModelCep from "../../models/Cep";

export default class AxiosViaCep {
  private host: string;
  constructor() {
    this.host = "http://viacep.com.br/ws/";
  }

  public async get(cep: string): Promise<ModelCep> {
    try {
      const response = await axios.get(this.host + cep + "/json/", {
        withCredentials: false,
      });
      return new ModelCep(response.data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
