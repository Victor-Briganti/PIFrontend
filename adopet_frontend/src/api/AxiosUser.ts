import AxiosBase from "./Super/AxiosBase";
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

class AxiosUserMetadata extends AxiosBase<UserCommon> {
  constructor() {
    super();
    this.host = this.host + "/user/metadata/";
  }

  async getMetadata(): Promise<UserMetadata> {
    return await this.get("");
  }

  async registerMetadata(metadata: UserMetadata): Promise<UserMetadata> {
    return await this.post("register/", metadata);
  }

  async updateMetadata(metadata: UserMetadata): Promise<UserMetadata> {
    return await this.put("register/", metadata);
  }
}

class AxiosUserCommon extends AxiosBase<UserCommon> {
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

  async getUserInfo(): Promise<UserCommon> {
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

  async getMetadata(): Promise<UserMetadata> {
    return await this.axiosUserMetadata.getMetadata();
  }

  async registerMetadata(metadata: UserMetadata): Promise<UserMetadata> {
    return await this.axiosUserMetadata.registerMetadata(metadata);
  }
  async updateMetadata(metadata: UserMetadata): Promise<UserMetadata> {
    return await this.axiosUserMetadata.updateMetadata(metadata);
  }
}

export default AxiosUserCommon;
