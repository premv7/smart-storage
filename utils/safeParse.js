function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

module.exports = safeParse;