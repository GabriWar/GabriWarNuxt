const genRandom = (charNumber) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const result = new Array(charNumber);

  // Use a buffer of random values to reduce Math.random() calls
  const bufferSize = Math.min(charNumber, 256);
  const randomBuffer = new Array(bufferSize);

  for (let i = 0; i < charNumber; i++) {
    // Refill buffer when needed
    if (i % bufferSize === 0) {
      for (let j = 0; j < bufferSize; j++) {
        randomBuffer[j] = Math.random();
      }
    }

    // Direct array access is faster than charAt
    const randomIndex = Math.floor(
      randomBuffer[i % bufferSize] * charactersLength
    );
    result[i] = characters[randomIndex];
  }

  return result.join("");
};

export default genRandom;
