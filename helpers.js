//Function to return a random string from the character set, defined in the function. Function takes a number that will determine the desired length of the generate string

const generateRandomString = function(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  if (length <= 0 || typeof length !== "number") {
    length = 3;
  }

  for (let i = 0; i < length; i++) {
    result += charset[Math.floor(Math.random() * 62)];
  }
  return result;

};

module.exports = { generateRandomString };
