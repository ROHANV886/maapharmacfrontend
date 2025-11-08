import CryptoJS from "crypto-js";

const SECRET_KEY = "my-super-secret-key"; // encryption password

export const secureStorage = {
  set: (key, value) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
    localStorage.setItem(key, encryptedData);
  },
  get: (key) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
};
