import { SECRET_KEY } from "./constants";

export const playSuccessSound = () => {
  const audio = new Audio("/sounds/success.mp3");
  audio
    .play()
    .catch((error) => console.error("Error playing success sound:", error));
};

export const playCancelSound = () => {
  const audio = new Audio("/sounds/cancel.mp3");
  audio
    .play()
    .catch((error) => console.error("Error playing cancel sound:", error));
};

export function customEncode(text: string) {
  const base64 = Buffer.from(text).toString("base64");
  let encoded = "";
  for (let i = 0; i < base64.length; i++) {
    const keyChar = SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
    const shifted = (base64.charCodeAt(i) + keyChar) % 128;
    encoded += String.fromCharCode(shifted);
  }
  return encoded;
}

export function customDecode(encoded: string) {
  let base64 = "";
  for (let i = 0; i < encoded.length; i++) {
    const keyChar = SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
    const unshifted = (encoded.charCodeAt(i) - keyChar + 128) % 128;
    base64 += String.fromCharCode(unshifted);
  }
  return atob(base64);
}
