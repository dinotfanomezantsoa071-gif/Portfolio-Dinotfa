type Listener = () => void;

interface PersistedStoreOptions<T extends string> {
  key: string;
  fallback: T;
  isValid: (value: string | null) => value is T;
  getDefault?: () => T;
  onChange?: (value: T) => void;
}

export interface PersistedStore<T extends string> {
  subscribe: (listener: Listener) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  set: (value: T) => void;
}

/**
 * Petit store persisté dans localStorage, compatible avec useSyncExternalStore.
 * Évite les setState dans useEffect et les erreurs d'hydratation.
 */
export function createPersistedStore<T extends string>(
  options: PersistedStoreOptions<T>,
): PersistedStore<T> {
  const { key, fallback, isValid, getDefault, onChange } = options;
  const listeners = new Set<Listener>();
  let memory: T | null = null;

  const resolveDefault = (): T => (getDefault ? getDefault() : fallback);

  const read = (): T => {
    if (memory !== null) {
      return memory;
    }
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(key);
    } catch {
      saved = null;
    }
    return isValid(saved) ? saved : resolveDefault();
  };

  const notify = (): void => {
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: Listener): (() => void) => {
    listeners.add(listener);

    const handleStorage = (event: StorageEvent): void => {
      if (event.key === key || event.key === null) {
        memory = null;
        onChange?.(read());
        listener();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", handleStorage);
    };
  };

  const set = (value: T): void => {
    memory = value;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Stockage indisponible (navigation privée) : la valeur reste en mémoire.
    }
    onChange?.(value);
    notify();
  };

  return {
    subscribe,
    getSnapshot: read,
    getServerSnapshot: () => fallback,
    set,
  };
}