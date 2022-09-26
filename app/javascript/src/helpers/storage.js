const setToLocalStorage = data => {
  Object.keys(data).forEach(key => {
    localStorage.setItem(key, JSON.stringify(data[key]));
  });
};

const getFromLocalStorage = key => {
  let storedValue = null;
  try {
    storedValue = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(null));
    logger.error(error);
  }
  return storedValue;
};

export { setToLocalStorage, getFromLocalStorage };
