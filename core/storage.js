const isAvailable = require("../utils/isAvailable");
const safeParse = require("../utils/safeParse");
const cleanup = require("./cleanup");

function createStorage(options = {}) {
  const prefix = options.prefix || "";

  function buildKey(key) {
    return prefix ? `${prefix}:${key}` : key;
  }

  function set(key, value, opts = {}) {
    if (!isAvailable()) return;

    const data = {
      value,
      expiry: opts.expiry
        ? Date.now() + opts.expiry * 1000
        : null
    };

    localStorage.setItem(buildKey(key), JSON.stringify(data));
  }

  function get(key, defaultValue = null) {
    if (!isAvailable()) return defaultValue;

    const item = localStorage.getItem(buildKey(key));
    if (!item) return defaultValue;

    const parsed = safeParse(item);
    if (!parsed) return defaultValue;

    if (parsed.expiry && Date.now() > parsed.expiry) {
      localStorage.removeItem(buildKey(key));
      return defaultValue;
    }

    return parsed.value;
  }

  function remove(key) {
    if (!isAvailable()) return;
    localStorage.removeItem(buildKey(key));
  }

  function clear() {
    if (!isAvailable()) return;

    Object.keys(localStorage).forEach(key => {
      if (!prefix || key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  function has(key) {
    return get(key) !== null;
  }

  function keys() {
    return Object.keys(localStorage).filter(key =>
      prefix ? key.startsWith(prefix) : true
    );
  }

  function getAll() {
    const result = {};

    keys().forEach(key => {
      result[key] = get(key);
    });

    return result;
  }

  return {
    set,
    get,
    remove,
    clear,
    has,
    keys,
    getAll,
    cleanup: () => cleanup(prefix)
  };
}

module.exports = createStorage;