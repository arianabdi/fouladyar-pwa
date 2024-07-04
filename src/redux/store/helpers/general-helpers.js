

export function emptyArray(size) {
  return Array.from(new Array(size));
}

export function collectionToArray(collection = {}) {
  return Object.keys(collection).map((itemId) => collection[itemId]);
}


export function keepWaiting(milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
}

export function toggleStateHOF(stateModifier) {
  return () => {
    stateModifier((prevState) => !prevState);
  };
}

export function randomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

export function normalizeCollection(data = [], primaryKey = 'id') {
  const collection = {};

  data.forEach((item) => {
    const itemPrimaryKey = item[primaryKey];

    collection[itemPrimaryKey] = item;
  });

  return collection;
}

export function makeFloatNumberSafe(number) {
  const safeFloatNumber = parseFloat(number.toFixed(4)).toString();

  return safeFloatNumber;
}

export function assignWithin(source = {}, destination = {}) {
  const finalObject = {};

  Object.keys(source).forEach((key) => {
    if (destination[key]) {
      finalObject[key] = destination[key];
    } else {
      finalObject[key] = source[key];
    }
  });

  return finalObject;
}
