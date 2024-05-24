export default interface InterfaceUserMetadata {
  user: number;
  address: number;
  cpf: string;
  birth_date: Date | string;
  phone: string;
  is_active?: boolean;
}
