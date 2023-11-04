const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[],
): Partial<T> => {
  const finalObj: Partial<T> = {};
  //  better runtime efficiency.
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }

  // inefficient
  //   for (const key of keys) {
  //     for (let i = 0; i < Object.keys(obj).length; i++) {
  //       if (key == Object.keys(obj)[i]) {
  //         finalObj[key] = obj[key];
  //       }
  //     }
  //   }
  return finalObj;
};

export default pick;
