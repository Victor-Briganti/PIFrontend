export default interface InterfaceAdoption {
  donor: number;
  adopter: number;
  animal: number;
  request_date: Date;
  request_status?: string;
  comment?: string;
}
