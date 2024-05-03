export interface PaginationData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export default class Pagination<T> {
  private count: number;
  private next: string | null;
  private previous: string | null;
  private results: T[];

  constructor(data: PaginationData<T>) {
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = data.results;
  }

  getCount(): number {
    return this.count;
  }

  getNext(): string | null {
    return this.next;
  }

  getPrevious(): string | null {
    return this.previous;
  }

  getResults(): T[] {
    return this.results;
  }
}
