export function customAlert(type = "info", text = "Something went wrong...", timeout = 1250) {
  // Eliminar cualquier alerta existente
  const existingAlert = document.querySelector(".custom-alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  // Crear el contenedor de la alerta
  const alertContainer = document.createElement("div");
  alertContainer.className = `custom-alert ${type}`;
  alertContainer.id = "customAlert";

  // Crear el botón de cierre
  const closeButton = document.createElement("span");
  closeButton.className = "close-btn";
  closeButton.innerHTML = "&times;";
  closeButton.onclick = () => alertContainer.style.display = "none";

  // Crear el contenedor del mensaje
  const customDiv = document.createElement("div");
  customDiv.className = "customDiv";

  // Crear el texto del mensaje
  const messageText = document.createElement("span");
  messageText.className = "text";
  messageText.id = "text";
  messageText.textContent = text;

  // Agregar los elementos al contenedor de alerta
  customDiv.appendChild(messageText);
  alertContainer.appendChild(closeButton);
  alertContainer.appendChild(customDiv);

  // Agregar la alerta al inicio del body
  document.body.prepend(alertContainer);

  // Mostrar la alerta con animación
  alertContainer.style.opacity = "0";
  alertContainer.style.transition = "opacity 0.75s";
  setTimeout(() => {
    alertContainer.style.opacity = "1";
  }, 10);

  // Configurar la duración de la alerta
  setTimeout(() => {
    alertContainer.style.opacity = "0";
    setTimeout(() => {
      alertContainer.remove();
    }, 750);
  }, timeout);
}
