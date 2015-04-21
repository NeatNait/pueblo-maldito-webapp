(function(){
  'use strict';

  angular.module('puebloMalditoWebappApp')
    .factory('dniManager', dniManager);

  function dniManager() {

    var service = {
      validate  : validate,
      getLetter : getLetter 
    };

    return service;

    ////////////

    function validate(dni) {
      // Comprobamos si tiene longitud 9
      if(dni && dni.length === 9) {
        // Extraemos los 8 primeros caracteres
        var numbersDNI = dni.substring(0, 8);

        // Comprobamos si los 8 primeros caracteres
        // son números
        if(!isInteger(numbersDNI)) {
          return false;
        }
 
        // Extraemos el último caracter
        var letterDNI = dni.substring(8);
 
        // Si la letra es correcta damos por válido el DNI
        return getLetter(numbersDNI).toUpperCase() === letterDNI;
      }
   
      return false;

      // Función que comprueba si un número es un
      // entero no negativo
      function isInteger(n) {
        var intRegex = /^\d+$/;
        return intRegex.test(n);
      }

    }

    // Función que hemos elaborado antes para
    // el cálculo de la letra
    function getLetter(dni) {
      var table = 'TRWAGMYFPDXBNJZSQVHLCKE';
      return table.charAt(dni % 23);
    }

  }

})();