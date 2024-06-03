import InterfaceUserCommon from "./InterfaceUserCommon";
import InterfaceUserMetadata from "./InterfaceUserMetadata";

export default interface InterfaceUser {
  userCommon: InterfaceUserCommon;
  userMetadata?: InterfaceUserMetadata;
}
