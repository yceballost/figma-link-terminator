document.addEventListener("DOMContentLoaded", function () {
  var tiempoInput = document.getElementById("tiempo");
  var guardarButton = document.getElementById("guardar");
  var pausarCheckbox = document.getElementById("pausar");

  chrome.storage.sync.get(["tiempoCierre", "pausado"], function (result) {
    tiempoInput.value = result.tiempoCierre || 10;
    pausarCheckbox.checked = result.pausado || false;
  });

  guardarButton.addEventListener("click", function () {
    var tiempo = parseInt(tiempoInput.value);

    chrome.storage.sync.set({ tiempoCierre: tiempo }, function () {
      alert("Interval time updated!");

      chrome.runtime.sendMessage({
        action: "actualizarTiempoCierre",
        tiempoCierre: tiempo,
      });
    });
  });

  pausarCheckbox.addEventListener("change", function () {
    var pausado = pausarCheckbox.checked;

    chrome.storage.sync.set({ pausado: pausado }, function () {
      var mensaje = pausado
        ? "Extension is stopped, good luck with all your Figma tabs."
        : "Extension is working!";
      // alert(mensaje);

      chrome.runtime.sendMessage({
        action: "actualizarEstadoPausa",
        pausado: pausado,
      });
    });
  });
});
