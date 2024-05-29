export default interface InterfaceContext<T> {
  context: T | null;
  setContext: React.Dispatch<React.SetStateAction<T | null>>;
}
