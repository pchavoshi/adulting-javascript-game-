import Animation from './animation';

document.addEventListener('DOMContentLoaded', () => {
  const directionsScreen = document.getElementById('directions-screen');
  const directionsButton = document.getElementById('directions-button');
  const welcomeScreen = document.getElementById('welcome-screen');

  directionsScreen.style.display = 'none';

  directionsButton.addEventListener('click', () => {
    directionsScreen.style.display = 'block';
    welcomeScreen.style.display = 'none';
  });

  document.addEventListener('click', () => {
    if (event.target.classList.contains('start-button')) {
      welcomeScreen.style.display = 'none';
      directionsScreen.style.display = 'none';

      const canvasEl = document.getElementById('game-canvas');
      const ctx = canvasEl.getContext('2d');

      canvasEl.width = 885;
      canvasEl.height = 600;

      new Animation(ctx, canvasEl).start();
    }
  });
});
