export default interface LocalStorageSaveable {
  loadFromLocalStorage(): void;
  saveToLocalStorage(): void;
}
