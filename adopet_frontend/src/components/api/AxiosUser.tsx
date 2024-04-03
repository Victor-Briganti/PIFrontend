import axios from "axios";
import AxiosBase from "./AxiosBase1";
import User from "../models/User";

class AxiosUser extends AxiosBase<User> {
  constructor() {
      super();
      this.host = this.host + "/user/";
  }
  
  async get(url: string, config = {}) {
      try {
          const response = await axios.get(this.host + url, config);
          console.log(response.data);
          return response.data;
      } catch (error) {
          console.error(error);
      }
  }

  async post(url: string, data: User | null = null, config = {}) {
    try {
      const response = await axios.post(this.host + url, data, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async put(url: string, data: User | null = null, config = {}) {
    try {
      const response = await axios.put(this.host + url, data, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async delete(url: string, config = {}) {
    try {
      const response = await axios.delete(this.host + url, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async login(email: string, password: string) {
    return await this.post("login/", {
      email,
      password,
    });
  }

  async register(email: string, password: string, name: string) {
    return await this.post("register/", {
      email,
      password,
      name,
    });
  }

  async logout() {
    return await this.post("logout/");
  }

  async getUserInfo() {
    return await this.get("");
  }
}

export default AxiosUser;