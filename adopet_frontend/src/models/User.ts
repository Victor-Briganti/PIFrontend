type UserFormData = {
  last_login?: string;
  is_superuser?: boolean;
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  is_active?: boolean;
  is_staff?: boolean;
  groups?: string[];
  user_permissions?: string[];
};

export class User {
  private last_login?: string;
  private is_superuser: boolean;
  private email: string;
  private firstname: string;
  private lastname: string;
  private password: string;
  private is_active: boolean;
  private is_staff: boolean;
  private groups?: string[];
  private user_permissions?: string[];

  constructor(data: UserFormData) {
    this.last_login = data.last_login;

    if (data.is_superuser !== undefined && data.is_superuser !== null) {
      this.is_superuser = data.is_superuser;
    } else {
      this.is_superuser = false;
    }

    if (
      data.email !== undefined &&
      data.email !== null &&
      !this.validatedEmail(data.email)
    ) {
      this.email = data.email;
    } else {
      throw new Error("Campo email é inválido");
    }

    if (
      data.firstname !== undefined &&
      data.firstname !== null &&
      !this.validatedName(data.firstname) &&
      data.firstname !== "" &&
      data.firstname.length <= 100
    ) {
      this.firstname = data.firstname;
    } else {
      throw new Error("Campo primeiro nome é inválido");
    }

    if (
      data.lastname !== undefined &&
      data.lastname !== null &&
      !this.validatedName(data.lastname) &&
      data.lastname !== "" &&
      data.lastname.length <= 100
    ) {
      this.lastname = data.lastname;
    } else {
      throw new Error("Campo último nome é inválido");
    }

    if (
      data.password !== undefined &&
      data.password !== null &&
      data.password.length >= 8
    ) {
      this.password = data.password;
    } else {
      throw new Error("Campo senha é inválido");
    }

    if (data.is_active !== undefined && data.is_active !== null) {
      this.is_active = data.is_active;
    } else {
      this.is_active = true;
    }

    if (data.is_staff !== undefined && data.is_staff !== null) {
      this.is_staff = data.is_staff;
    } else {
      this.is_staff = false;
    }

    this.groups = data.groups;
    this.user_permissions = data.user_permissions;
  }

  private validatedEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value) === false) return false;

    return true;
  }

  private validatedName(value: string): boolean {
    const numberRegex = /{[0-9]}/;
    if (numberRegex.test(value) || !value.trim()) return false;

    return true;
  }

  getLastLogin(): string | undefined {
    return this?.last_login;
  }

  getIsSuperUser(): boolean {
    return this.is_superuser;
  }

  getEmail(): string {
    return this.email;
  }

  getFirstname(): string {
    return this?.lastname;
  }

  getLastname(): string {
    return this.firstname;
  }

  getPassword(): string {
    return this.password;
  }

  getIsActive(): boolean {
    return this.is_active;
  }

  getIsStaff(): boolean {
    return this.is_staff;
  }

  getGroups(): string[] | undefined {
    return this?.groups;
  }

  getUserPermissions(): string[] | undefined {
    return this?.user_permissions;
  }

  setEmail(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value) === false) throw new Error("Email não é valido");

    this.email = value;
  }

  setFirstName(value: string) {
    if (!this.validatedName(value) || value === "" || value.length > 100)
      throw new Error("Primeiro nome inválido");

    this.firstname = value;
  }

  setLastName(value: string) {
    if (!this.validatedName(value) || value === "" || value.length > 100)
      throw new Error("Último nome inválido");

    this.lastname = value;
  }

  setPassword(value: string) {
    if (value.length < 8)
      throw new Error("Senha deve ter no mínimo 8 caracteres");
    this.password = value;
  }

  toJSON(): any {
    return {
      last_login: this?.last_login,
      is_superuser: this?.is_superuser,
      email: this?.email,
      firstname: this?.firstname,
      lastname: this?.lastname,
      password: this?.password,
      is_active: this?.is_active,
      is_staff: this?.is_staff,
      groups: this?.groups,
      user_permissions: this?.user_permissions,
    };
  }
}
