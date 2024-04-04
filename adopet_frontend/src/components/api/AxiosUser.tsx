import axios from "axios";
import AxiosBase from "./AxiosBase";
import { User } from "../models/User";

class AxiosUser extends AxiosBase<User> {
  constructor() {
    super();
    this.host = this.host + "/user/";
  }
  async login(email: string, password: string) {
    return await this.post("login/", {
      email,
      password,
    });
  }

  async register(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    return await this.post("register/", {
      email,
      password,
      firstname,
      lastname,
    });
  }

  async logout() {
    return await this.post("logout/");
  }

  async removeUser() {
    return await this.delete("delete/");
  }

  async getUserInfo() {
    return await this.get("");
  }

  async changePassword(id: number, password: string) {
    return await this.put("update/", {
      id: id,
      password: password,
    });
  }
}

export default AxiosUser;
