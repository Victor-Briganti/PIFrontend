import AxiosBase from "./AxiosBase";
import { User } from "../models/User";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  firstname: string;
  lastname: string;
}

interface ChangePasswordData {
  id: number;
  password: string;
}

class AxiosUser extends AxiosBase<User> {
  constructor() {
    super();
    this.host = this.host + "/user/";
  }
  async login(email: string, password: string) {
    return await this.post<LoginData>("login/", {
      email,
      password,
    });
  }

  async registerUser(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    return await this.post<RegisterData>("register/", {
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
    return await this.put<ChangePasswordData>("update/", {
      id: id,
      password: password,
    });
  }
}

export default AxiosUser;
