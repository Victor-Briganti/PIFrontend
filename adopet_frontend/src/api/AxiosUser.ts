import InterfaceUser from "../models/interfaces/user/InterfaceUser";
import InterfaceUserCommon from "../models/interfaces/user/InterfaceUserCommon";
import InterfaceUserMetadata from "../models/interfaces/user/InterfaceUserMetadata";
import {
  validatedUserCommon,
  validatedUserMetadata,
} from "../models/validators/ValidatedUser";
import SuperAxios from "./super/SuperAxios";

interface LoginData {
  email: string;
  password: string;
}

interface PasswordFieldUpdate {
  id: number;
  password: string;
}

interface FieldUpdate {
  id: number;
  value: string;
}

class AxiosUserMetadata extends SuperAxios<InterfaceUserCommon> {
  constructor() {
    super();
    this.host = this.host + "/user/metadata/";
  }

  async getUserMetadata(): Promise<InterfaceUserMetadata> {
    return await this.get("");
  }

  async registerMetadata(
    metadata: InterfaceUserMetadata
  ): Promise<InterfaceUserMetadata> {
    const validatedMetadata = validatedUserMetadata(metadata);
    return await this.post("register/", validatedMetadata);
  }

  async updateMetadata(
    metadata: InterfaceUserMetadata
  ): Promise<InterfaceUserMetadata> {
    const validatedMetadata = validatedUserMetadata(metadata);
    return await this.put("register/", validatedMetadata);
  }
}

class AxiosUser extends SuperAxios<InterfaceUserCommon> {
  axiosUserMetadata: AxiosUserMetadata;

  constructor() {
    super();
    this.host = this.host + "/user/";
    this.axiosUserMetadata = new AxiosUserMetadata();
  }

  async login(data: LoginData): Promise<InterfaceUserCommon> {
    return await this.post<LoginData>("login/", data);
  }

  async registerUser(user: InterfaceUserCommon): Promise<InterfaceUserCommon> {
    const validatedCommon = validatedUserCommon(user);
    return await this.post("register/", validatedCommon, {
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

  async getUserCommon(): Promise<InterfaceUserCommon> {
    return await this.get("");
  }

  async changePassword(
    data: PasswordFieldUpdate
  ): Promise<InterfaceUserCommon> {
    return await this.put<PasswordFieldUpdate>("update/", data);
  }

  async changeAvatar(data: FieldUpdate): Promise<InterfaceUserCommon> {
    return await this.put<FieldUpdate>("update/", data, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  async getUserMetadata(): Promise<InterfaceUserMetadata> {
    return await this.axiosUserMetadata.getUserMetadata();
  }

  async registerMetadata(
    metadata: InterfaceUserMetadata
  ): Promise<InterfaceUserMetadata> {
    return await this.axiosUserMetadata.registerMetadata(metadata);
  }

  async updateMetadata(
    metadata: InterfaceUserMetadata
  ): Promise<InterfaceUserMetadata> {
    return await this.axiosUserMetadata.updateMetadata(metadata);
  }

  async getUser(): Promise<InterfaceUser> {
    const userCommon = await this.getUserCommon();
    let userMetadata;
    await this.getUserMetadata()
      .then((response) => {
        userMetadata = response as InterfaceUserMetadata;
      })
      .catch((error) => {
        userMetadata = undefined;
      });

    return {
      userCommon: userCommon,
      userMetadata: userMetadata,
    } as InterfaceUser;
  }
}

export default AxiosUser;
