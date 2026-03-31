function isAvailable() {
  if (typeof window === "undefined") {
    console.warn("smart-storage: localStorage not available (Node.js environment)");
    return false;
  }

  return typeof localStorage !== "undefined";
}

module.exports = isAvailable;