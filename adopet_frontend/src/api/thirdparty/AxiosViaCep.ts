import axios from "axios";
import InterfaceViaCep from "../../interfaces/thirdparty/InterfaceViaCep";

export default class AxiosViaCep {
  private host: string;
  constructor() {
    this.host = "http://viacep.com.br/ws/";
  }

  public async get(cep: string): Promise<InterfaceViaCep> {
    try {
      const response = await axios.get(this.host + cep + "/json/", {
        withCredentials: false,
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
