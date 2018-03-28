import Animation from './animation';

document.addEventListener('DOMContentLoaded', () => {
  const canvasEl = document.getElementById('game-canvas');
  const ctx = canvasEl.getContext('2d');

  canvasEl.width = 800;
  canvasEl.height = 600;

  new Animation(ctx, canvasEl).welcome();
});
