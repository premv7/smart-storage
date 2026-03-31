const safeParse = require("../utils/safeParse");
const { emit } = require("./events");

function cleanup(prefix = "") {
  Object.keys(localStorage).forEach(key => {
    if (prefix && !key.startsWith(prefix)) return;

    const item = safeParse(localStorage.getItem(key));
    if (!item) return;

    if (item.expiry && Date.now() > item.expiry) {
      localStorage.removeItem(key);
      emit("expire", { key, value: item.value });
    }
  });
}

module.exports = cleanup;