var url = "https://www.figma.com/file/"; // Cambia la URL por la que deseas cerrar las pestañas

var tiempoCierre = 10; // Valor predeterminado del tiempo de cierre en segundos
var pausado = false; // Estado predeterminado de pausa

chrome.storage.sync.get(["tiempoCierre", "pausado"], function (result) {
  tiempoCierre = result.tiempoCierre || tiempoCierre;
  pausado = result.pausado || pausado;

  // Iniciar el horario aquí
  scheduleCierrePestanas();
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "actualizarTiempoCierre") {
    tiempoCierre = message.tiempoCierre;
    console.log("Tiempo de cierre actualizado:", tiempoCierre);
  } else if (message.action === "actualizarEstadoPausa") {
    pausado = message.pausado;
    console.log("Estado de pausa actualizado:", pausado);
  }
});

function cerrarPestanas() {
  if (!pausado) {
    chrome.tabs.query({ url: "*://*.figma.com/*" }, function (tabs) {
      tabs.forEach(function (tab) {
        chrome.tabs.remove(tab.id);
      });
    });
  }
}

function scheduleCierrePestanas() {
  setTimeout(function () {
    cerrarPestanas();
    scheduleCierrePestanas();
  }, tiempoCierre * 1000);
}

scheduleCierrePestanas();
