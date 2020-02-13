export const formatNumText = num => {
  return typeof num === "string" ? num : Number(num).toLocaleString();
};

export const generateRandomNumber = (low, high) => {
  return Math.floor(
    Number(low) + Math.random() * (Number(high) + 1 - Number(low))
  );
};

export const isValidEntry = input => !isNaN(input);
