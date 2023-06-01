var url = "https://www.figma.com/file/"; // Cambia la URL por la que deseas cerrar las pestañas

var tiempoCierre = 10; // Valor predeterminado del tiempo de cierre en segundos
var pausado = false; // Estado predeterminado de pausa

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set(
    { tiempoCierre: tiempoCierre, pausado: pausado },
    function () {
      console.log("Initial values set.");
    }
  );
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
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        if (tab.url.includes(url)) {
          chrome.tabs.remove(tab.id);
        }
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
