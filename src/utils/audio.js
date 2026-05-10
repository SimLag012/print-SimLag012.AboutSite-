export const playSound = (type) => {
  const event = new CustomEvent('play-sfx', { detail: type });
  window.dispatchEvent(event);
};
