import Animation from './animation';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('game-canvas');
  const ctx = canvasEl.getContext("2d");

  canvasEl.width = 600;
  canvasEl.height = 400;

  new Animation(ctx).start();
});
