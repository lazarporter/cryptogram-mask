// https://stackoverflow.com/a/2450976/10481855
const shuffle = (array: string[]) => {
  let currentIndex: number = array.length;
  let randomIndex: number = 0;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const makeKey = (): { [key: string]: string }[] => {
  const alphabet = Array.from(Array(26).keys()).map((num) =>
    String.fromCharCode(num + 97)
  );

  const shuffledAlphabet = shuffle([...alphabet]);
  const key = alphabet.map((char, i) => ({ [char]: shuffledAlphabet[i] }));
  return key;
};

export const makeCryptogram = (
  input: string,
  key: { [key: string]: string }[]
): string => {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i];
    if (currentChar >= "A" && currentChar <= "Z") {
      const currentLetterKey = key.find(
        (singleLetterKey) =>
          Object.keys(singleLetterKey)[0] === currentChar.toLowerCase()
      );

      if (!currentLetterKey) return "Something went wrong...";
      const cryptedChar = Object.values(currentLetterKey)[0];
      output += cryptedChar.toUpperCase();
    } else if (currentChar >= "a" && currentChar <= "z") {
      const currentLetterKey = key.find(
        (singleLetterKey) => Object.keys(singleLetterKey)[0] === currentChar
      );
      if (!currentLetterKey) return "Something went wrong...";
      const cryptedChar = Object.values(currentLetterKey)[0];
      output += cryptedChar;
    } else {
      // not a letter
      output += currentChar;
    }
  }
  return output;
};
