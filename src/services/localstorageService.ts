export const localStorageService = {
  set: (key: string, value: string, ttl = 360000) => {
    const expiry = Date.now() + ttl; // TTL in milliseconds
    const item = { value, expiry };
    localStorage.setItem(key, JSON.stringify(item));
  },
  get: (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = Date.now();

    if (now > item.expiry) {
      localStorage.removeItem(key); // Remove expired item
      return null;
    }

    return item.value;
  },
};
