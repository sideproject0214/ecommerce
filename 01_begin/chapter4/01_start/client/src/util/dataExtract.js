export const dataExtract = (value) => {
  if (value !== undefined) {
    return Object.values(value?.entities);
  }
};
