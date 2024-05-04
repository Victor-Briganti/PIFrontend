import { StatusChoiceMap } from "./choices/ChoicesMap";

interface AdoptionFormData {
  donor: number;
  adopter: number;
  animal: number;
  request_date: Date;
  request_status?: string;
  comment?: string;
}

export default class Adoption {
  private statusMap: StatusChoiceMap = new StatusChoiceMap();

  private donor: number;
  private adopter: number;
  private animal: number;
  private request_date: Date;
  private request_status?: string;
  private comment?: string;

  constructor(data: AdoptionFormData) {
    if (data.donor < 0) {
      throw new Error("Doador não pode ter o id negativo");
    }

    if (data.adopter < 0) {
      throw new Error("Adodante não pode ter o id negativo");
    }

    if (data.animal < 0) {
      throw new Error("Animal não pode ter o id negativo");
    }

    this.request_status = this.statusMap.getValue(
      data.request_status ?? "pending"
    );
    this.donor = data.donor;
    this.adopter = data.adopter;
    this.animal = data.animal;
    this.request_date = data.request_date;
    this.comment = data.comment;
  }

  getDonor(): number {
    return this.donor;
  }

  getAdopter(): number {
    return this.adopter;
  }

  getAnimal(): number {
    return this.animal;
  }

  getRequestDate(): Date {
    return this.request_date;
  }

  getRequestStatus(): string | undefined {
    return this?.request_status;
  }

  getComment(): string | undefined {
    return this?.comment;
  }

  setDonor(donor: number) {
    if (donor < 0) {
      throw new Error("Doador não pode ter o id negativo");
    }

    this.donor = donor;
  }

  setAdopter(adopter: number) {
    if (adopter < 0) {
      throw new Error("Adotante não pode ter o id negativo");
    }

    this.adopter = adopter;
  }

  setAnimal(animal: number) {
    if (animal < 0) {
      throw new Error("Animal não pode ter o id negativo");
    }

    this.animal = animal;
  }

  setRequestDate(request_date: Date) {
    this.request_date = request_date;
  }

  setRequestStatus(request_status: string) {
    this.request_status = this.statusMap.getValue(request_status);
  }

  setComment(comment: string) {
    this.comment = comment;
  }
}
