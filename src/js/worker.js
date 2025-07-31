// src/js/worker.js
// Tareas de cómputo pesadas en un hilo separado
self.onmessage = (e) => {
  const data = e.data;
  // ejemplo de procesamiento intenso
  const result = data.map(x => x * 2);
  self.postMessage(result);
};
