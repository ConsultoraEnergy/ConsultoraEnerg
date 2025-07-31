import '../css/styles.css';

function startApp() {
  if (window.Worker) {
    const worker = new Worker(new URL(/* webpackChunkName: "worker" */ './js/worker.js', import.meta.url));
    worker.postMessage([/* datos */]);
    worker.onmessage = () => initSlider();
  } else {
    initSlider();
  }
}

export function initSlider() {
  import(/* webpackChunkName: "slider" */ './js/slider.js')
    .then(({ default: slider }) => slider());
}

window.addEventListener('DOMContentLoaded', startApp);

