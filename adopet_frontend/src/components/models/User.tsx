export class User {
  id: number;
  last_login: string;
  is_superuser: boolean;
  email: string;
  firstname: string;
  lastname: string;
  is_active: boolean;
  is_staff: boolean;
  groups: string[];
  user_permissions: string[];

  constructor(data: any) {
    this.id = data.id;
    this.last_login = data.last_login;
    this.is_superuser = data.is_superuser;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.is_active = data.is_active;
    this.is_staff = data.is_staff;
    this.groups = data.groups;
    this.user_permissions = data.user_permissions;
  }
}
