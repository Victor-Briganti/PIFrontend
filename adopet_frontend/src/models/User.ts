import { validatedEmail, validatedName } from "../utils/Verification";

interface UserFormData {
  id?: number;
  last_login?: string;
  is_superuser?: boolean;
  email: string;
  firstname: string;
  lastname: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_group?: string[];
  user_permissions?: string[];
}

export default class User {
  private id?: number;
  private last_login?: string;
  private is_superuser?: boolean;
  private email: string;
  private firstname: string;
  private lastname: string;
  private is_active?: boolean;
  private is_staff?: boolean;
  private is_group?: string[];
  private user_permissions?: string[];

  constructor(data: UserFormData) {
    if (validatedEmail(data.email) === false) {
      throw new Error(`Email inválido: ${data.email}`);
    }

    if (validatedName(data.firstname, 100) === false) {
      throw new Error(`Primeiro nome inválido: ${data.firstname}`);
    }

    if (validatedName(data.lastname, 100) === false) {
      throw new Error(`Último nome inválido: ${data.lastname}`);
    }

    if (data.id !== undefined && data.id >= 0) {
      this.id = data.id;
    }

    if (data.last_login !== undefined) {
      const dateValidate = new Date(data.last_login);
      if (!isNaN(dateValidate.getTime())) {
        this.last_login = data.last_login;
      }
    }

    if (data.is_active !== undefined) {
      this.is_active = data.is_active;
    } else {
      this.is_active = true;
    }

    if (data.is_superuser !== undefined) {
      this.is_superuser = data.is_superuser;
    } else {
      this.is_superuser = true;
    }

    if (data.is_staff !== undefined) {
      this.is_staff = data.is_staff;
    } else {
      this.is_staff = true;
    }

    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.is_group = data.is_group;
    this.user_permissions = data.user_permissions;
  }

  getId(): number | undefined {
    return this?.id;
  }

  getLastLogin(): string | undefined {
    return this?.last_login;
  }

  getIsSuperuser(): boolean | undefined {
    return this?.is_superuser;
  }

  getIsStaff(): boolean | undefined {
    return this?.is_staff;
  }

  getIsActive(): boolean | undefined {
    return this?.is_active;
  }

  getIsGroup(): string[] | undefined {
    return this?.is_group;
  }

  getUserPermissions(): string[] | undefined {
    return this?.user_permissions;
  }

  getEmail(): string {
    return this.email;
  }

  getFirstname(): string {
    return this.firstname;
  }

  getLastname(): string {
    return this.lastname;
  }

  setId(id: number) {
    if (id < 0) {
      throw new Error("Id não pode ser negativo");
    }

    this.id = id;
  }

  setLastLogin(last_login: string) {
    const dateValidate = new Date(last_login);
    if (!isNaN(dateValidate.getTime())) {
      this.last_login = last_login;
    }
  }

  setIsSuperuser(is_superuser: boolean) {
    this.is_superuser = is_superuser;
  }

  setIsStaff(is_staff: boolean) {
    this.is_staff = is_staff;
  }

  setIsActive(is_active: boolean) {
    this.is_active = is_active;
  }

  setIsGroup() {
    return this?.is_group;
  }

  setUserPermissions(user_permisssions: string[]) {
    this.user_permissions = user_permisssions;
  }

  setEmail(email: string) {
    if (validatedEmail(email) === false) {
      throw new Error(`Email inválido: ${email}`);
    }

    this.email = email;
  }

  setFirstname(firstname: string) {
    if (validatedName(firstname, 100) === false) {
      throw new Error(`Primeiro nome inválido: ${firstname}`);
    }

    this.firstname = firstname;
  }

  setLastname(lastname: string) {
    if (validatedName(lastname, 100) === false) {
      throw new Error(`Primeiro nome inválido: ${lastname}`);
    }

    this.lastname = lastname;
  }
}
