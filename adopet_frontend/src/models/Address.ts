import InterfaceCity from "./City";

export default interface InterfaceAddress {
  id: number;
  city: InterfaceCity;
  zip_code: string;
  district: string;
  street: string;
  complement: string;
  house_number: string;
}
