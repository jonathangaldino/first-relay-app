export default function getDataloaders(loaders) {
  const result = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key in loaders) {
    if (loaders[key].getLoader) {
      result[key] = loaders[key].getLoader();
    }
  }

  return result;
}
