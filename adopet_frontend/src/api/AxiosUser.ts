import ModelUser from "../models/User";
import ModelUserCommon from "../models/UserCommon";
import ModelUserMetadata from "../models/UserMetadata";
import SuperAxios from "./super/SuperAxios";

interface LoginData {
  email: string;
  password: string;
}

interface FieldUpdate {
  id: number;
  value: string;
}

class AxiosUserMetadata extends SuperAxios<ModelUserCommon> {
  constructor() {
    super();
    this.host = this.host + "/user/metadata/";
  }

  async getUserMetadata(): Promise<ModelUserMetadata> {
    return await this.get("");
  }

  async registerMetadata(
    metadata: ModelUserMetadata
  ): Promise<ModelUserMetadata> {
    return await this.post("register/", metadata);
  }

  async updateMetadata(
    metadata: ModelUserMetadata
  ): Promise<ModelUserMetadata> {
    return await this.put("register/", metadata);
  }
}

class AxiosUser extends SuperAxios<ModelUserCommon> {
  axiosUserMetadata: AxiosUserMetadata;

  constructor() {
    super();
    this.host = this.host + "/user/";
    this.axiosUserMetadata = new AxiosUserMetadata();
  }

  async login(data: LoginData): Promise<LoginData> {
    return await this.post<LoginData>("login/", data);
  }

  async registerUser(user: ModelUserCommon): Promise<ModelUserCommon> {
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

  async getUserCommon(): Promise<ModelUserCommon> {
    return await this.get("");
  }

  async changePassword(data: FieldUpdate): Promise<ModelUserCommon> {
    return await this.put<FieldUpdate>("update/", data);
  }

  async changeAvatar(data: FieldUpdate): Promise<ModelUserCommon> {
    return await this.put<FieldUpdate>("update/", data, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  async getUserMetadata(): Promise<ModelUserMetadata> {
    return await this.axiosUserMetadata.getUserMetadata();
  }

  async registerMetadata(
    metadata: ModelUserMetadata
  ): Promise<ModelUserMetadata> {
    return await this.axiosUserMetadata.registerMetadata(metadata);
  }

  async updateMetadata(
    metadata: ModelUserMetadata
  ): Promise<ModelUserMetadata> {
    return await this.axiosUserMetadata.updateMetadata(metadata);
  }

  async getUser(): Promise<ModelUser> {
    const userCommon = this.getUserCommon();
    const userMetadata = this.getUserMetadata();

    return new ModelUser(await userCommon, await userMetadata);
  }
}

export default AxiosUser;
