import SuperAxios from "./super/SuperAxios";
import User from "../models/User";
import UserCommon from "../models/UserCommon";
import UserMetadata from "../models/UserMetadata";

interface LoginData {
  email: string;
  password: string;
}

interface FieldUpdate {
  id: number;
  value: string;
}

class AxiosUserMetadata extends SuperAxios<UserCommon> {
  constructor() {
    super();
    this.host = this.host + "/user/metadata/";
  }

  async getUserMetadata(): Promise<UserMetadata> {
    return await this.get("");
  }

  async registerMetadata(metadata: UserMetadata): Promise<UserMetadata> {
    return await this.post("register/", metadata);
  }

  async updateMetadata(metadata: UserMetadata): Promise<UserMetadata> {
    return await this.put("register/", metadata);
  }
}

class AxiosUser extends SuperAxios<UserCommon> {
  axiosUserMetadata: AxiosUserMetadata;

  constructor() {
    super();
    this.host = this.host + "/user/";
    this.axiosUserMetadata = new AxiosUserMetadata();
  }

  async login(data: LoginData): Promise<LoginData> {
    return await this.post<LoginData>("login/", data);
  }

  async registerUser(user: UserCommon): Promise<UserCommon> {
    return await this.post("register/", user, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  async logout(): Promise<void> {
    this.post("logout/");
  }
  async deleteUser(): Promise<boolean> {
    return await this.delete("delete/");
  }

  async getUserCommon(): Promise<UserCommon> {
    return await this.get("");
  }

  async changePassword(data: FieldUpdate): Promise<UserCommon> {
    return await this.put<FieldUpdate>("update/", data);
  }

  async changeAvatar(data: FieldUpdate): Promise<UserCommon> {
    return await this.put<FieldUpdate>("update/", data, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  async getUserMetadata(): Promise<UserMetadata> {
    return await this.axiosUserMetadata.getUserMetadata();
  }

  async registerMetadata(metadata: UserMetadata): Promise<UserMetadata> {
    return await this.axiosUserMetadata.registerMetadata(metadata);
  }

  async updateMetadata(metadata: UserMetadata): Promise<UserMetadata> {
    return await this.axiosUserMetadata.updateMetadata(metadata);
  }

  async getUser(): Promise<User> {
    const userCommon = this.getUserCommon();
    const userMetadata = this.getUserMetadata();

    return new User(await userCommon, await userMetadata);
  }
}

export default AxiosUser;
