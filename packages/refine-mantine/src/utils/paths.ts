export function has(obj: any, path: string): boolean {
  if (obj == null) return false;

  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current == null || !(key in current)) {
      return false;
    }
    current = current[key];
  }

  return true;
}

export const get = (obj: any, path: string) => {
  if (obj == null) return undefined;

  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current == null || !(key in current)) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}

export const set = (obj: any, path: string, value: unknown): any => {
  if (obj == null) return obj;

  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (current[key] == null || typeof current[key] !== "object") {
        current[key] = typeof keys[i + 1] === "number" ? [] : {};
      }
      current = current[key];
    }
  }

  return obj;
}
