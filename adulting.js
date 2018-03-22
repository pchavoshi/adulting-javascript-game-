import Avatar from './avatar';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('game-canvas');
  const ctx = canvasEl.getContext("2d");

  canvasEl.width = 600;
  canvasEl.height = 400;

  const avatar = new Avatar (300, 390, "red", 10, 10);
  avatar.draw(ctx);
});
