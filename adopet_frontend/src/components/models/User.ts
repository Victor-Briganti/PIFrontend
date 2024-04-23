export class User {
  private id?: number;
  private last_login?: string;
  private is_superuser?: boolean;
  private email?: string;
  private firstname?: string;
  private lastname?: string;
  private password?: string;
  private is_active?: boolean;
  private is_staff?: boolean;
  private groups?: string[];
  private user_permissions?: string[];

  constructor(data: any) {
    this.id = data.id;
    this.last_login = data.last_login;
    this.is_superuser = data.is_superuser;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.password = data.password;
    this.is_active = data.is_active;
    this.is_staff = data.is_staff;
    this.groups = data.groups;
    this.user_permissions = data.user_permissions;
  }

  getId(): number | unknown {
    return this.id;
  }

  getLastLogin(): string | unknown {
    return this?.last_login;
  }

  getSuperuser(): boolean | unknown {
    return this?.is_superuser;
  }

  getEmail(): string | unknown {
    return this?.email;
  }

  getFirstName(): string | unknown {
    return this?.firstname;
  }

  getLastName(): string | unknown {
    return this?.lastname;
  }

  getPassword(): string | unknown {
    return this?.password;
  }

  getIsActive(): boolean | unknown {
    return this?.is_active;
  }

  getIsStaff(): boolean | unknown {
    return this?.is_staff;
  }

  getGroups(): string[] | unknown {
    return this?.groups;
  }

  getUserPermissions(): string[] | unknown {
    return this?.user_permissions;
  }

  setEmail(value: string) {
    this.email = value;
  }

  setFirstName(value: string) {
    this.firstname = value;
  }

  setLastName(value: string) {
    this.lastname = value;
  }

  setPassword(value: string) {
    this.password = value;
  }
}
