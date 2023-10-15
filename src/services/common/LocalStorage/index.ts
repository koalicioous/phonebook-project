/* eslint-disable no-unused-vars */
interface LocalStorageServiceInterface<T> {
  get<K extends keyof T>(key: K): T[K] | null;

  set<K extends keyof T>(key: K, value: T[K]): void;

  remove<K extends keyof T>(key: K): void;

  clear(): void;
}

class StorageService<T> implements LocalStorageServiceInterface<T> {
  constructor(private storage: Storage | undefined) {}

  set<K extends keyof T>(key: K, value: T[K]): void {
    if (this.storage === undefined) {
      return;
    }
    this.storage.setItem(key.toString(), JSON.stringify(value));
  }

  get<K extends keyof T>(key: K): T[K] | null {
    if (this.storage === undefined) {
      return null;
    }
    const value = this.storage.getItem(key.toString());

    if (
      value === null ||
      value === "null" ||
      value === undefined ||
      value === "undefined"
    ) {
      return null;
    }

    return JSON.parse(value);
  }

  remove<K extends keyof T>(key: K): void {
    if (this.storage === undefined) {
      return;
    }
    this.storage.removeItem(key.toString());
  }

  clear(): void {
    if (this.storage === undefined) {
      return;
    }
    this.storage.clear();
  }
}

class LocalStorageService<T> extends StorageService<T> {
  public localStorageEnabled: boolean;

  constructor() {
    let storage: Storage | undefined;

    if (typeof window !== "undefined") {
      try {
        storage = window.localStorage;
      } catch (e) {
        storage = undefined;
      }
    }

    super(storage);

    this.localStorageEnabled = !!storage;
  }
}

export default LocalStorageService;
