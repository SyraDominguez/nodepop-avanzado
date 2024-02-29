'use strict';

// Función para actualizar la fecha y hora cada segundo
function updateDateTime() {
  var now = new Date();
  var dateTimeString = 'Today, ' + now.toLocaleDateString('en-US') + ' ' + now.toLocaleTimeString('en-US');
  document.getElementById('currentDateTime').textContent = dateTimeString;
}

// Llamar a la función inicialmente
updateDateTime();

// Actualizar la fecha y hora cada segundo
setInterval(updateDateTime, 1000);