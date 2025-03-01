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
