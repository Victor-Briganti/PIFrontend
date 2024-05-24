export default interface InterfaceUserCommon {
  id?: number;
  last_login?: Date;
  is_superuser?: boolean;
  email: string;
  firstname: string;
  lastname: string;
  password?: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_group?: string[];
  avatar?: File | string;
  user_permissions?: string[];
}
