const createStorage = require("./core/storage");
const { on } = require("./core/events");

const store = createStorage();

module.exports = {
  ...store,
  createStorage,
  on
};