import InterfaceAnimal from "../animal/InterfaceAnimal";
import InterfaceUser from "../user/InterfaceUser";

export interface InterfaceAdoption {
  id?: number;
  donor: number;
  adopter: number;
  animal: number;
  request_date: Date;
  request_status?: string;
  comment?: string;
}

export interface InterfaceAdoptionDetails {
  id: number;
  animal: InterfaceAnimal;
  user: InterfaceUser;
}
