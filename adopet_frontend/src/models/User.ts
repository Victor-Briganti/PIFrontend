import ModelUserCommon from "./UserCommon";
import ModelUserMetadata from "./UserMetadata";

export default class ModelUser {
  private userCommon: ModelUserCommon;
  private userMetadata: ModelUserMetadata;

  constructor(userCommon: ModelUserCommon, userMetadata: ModelUserMetadata) {
    this.userCommon = userCommon;
    this.userMetadata = userMetadata;
  }

  getUserCommon(): ModelUserCommon {
    return this.userCommon;
  }

  getUserMetadata(): ModelUserMetadata {
    return this.userMetadata;
  }

  setUserCommon(user: ModelUserCommon) {
    this.userCommon = user;
  }

  setUserMetadata(user: ModelUserMetadata) {
    this.userMetadata = user;
  }
}
