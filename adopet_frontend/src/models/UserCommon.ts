import { validatedEmail, validatedName } from "../utils/Verification";

interface FormDataUser {
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
  avatar?: string;
  user_permissions?: string[];
}

export default class ModelUserCommon {
  private id?: number;
  private last_login?: Date;
  private is_superuser?: boolean;
  private email: string;
  private firstname: string;
  private lastname: string;
  private password?: string;
  private is_active?: boolean;
  private is_staff?: boolean;
  private is_group?: string[];
  private avatar?: string;
  private user_permissions?: string[];

  constructor(data: FormDataUser) {
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

    if (
      data.password !== undefined &&
      (data.password === "" || data.password?.length < 8)
    ) {
      throw new Error("Senha inválida");
    }

    this.last_login = data.last_login;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.password = data.password;
    this.is_group = data.is_group;
    this.avatar = data.avatar;
    this.user_permissions = data.user_permissions;
  }

  getId(): number | undefined {
    return this?.id;
  }

  getLastLogin(): Date | undefined {
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

  getAvatar(): string | undefined {
    return this?.avatar;
  }

  setLastLogin(last_login: Date) {
    this.last_login = last_login;
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

  setAvatar(avatar: string) {
    this.avatar = avatar;
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
