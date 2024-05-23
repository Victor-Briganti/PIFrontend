export default interface PaginationData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
