let aes256 = require('aes256');

let secret_key = 'uI2ooxtwHeI6q69PS98fx9SWVGbpQohO';

// encrypted text
export const to_Encrypt = (text) => {
  //let buffer = Buffer.from(text);
  let encrypted = aes256.encrypt(secret_key, text);
  return encrypted;
};

//welcome message is not decrypted
export const to_Decrypt = (cipher, username) => {
  console.log("cipher",cipher);	
  if (cipher.startsWith('Welcome')) {
    return cipher;
  }

  if (cipher.startsWith(username)) {
    return cipher;
  }
  //decrypted message
  let decrypted = aes256.decrypt(secret_key, cipher);
  return decrypted;
};
