document.addEventListener("DOMContentLoaded", function () {
  var tiempoInput = document.getElementById("tiempo");
  var guardarButton = document.getElementById("guardar");

  chrome.storage.sync.get(["tiempoCierre"], function (result) {
    tiempoInput.value = result.tiempoCierre || 10;
  });

  guardarButton.addEventListener("click", function () {
    var tiempo = parseInt(tiempoInput.value);

    chrome.storage.sync.set({ tiempoCierre: tiempo }, function () {
      alert("La configuración se ha guardado correctamente.");

      // Envía el mensaje al background script
      chrome.runtime.sendMessage({
        action: "actualizarTiempoCierre",
        tiempoCierre: tiempo,
      });
    });
  });
});
