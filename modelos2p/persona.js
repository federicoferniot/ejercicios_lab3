"use strict";
var ABMEmpleados;
(function (ABMEmpleados) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Persona.prototype.personaToJson = function () {
            return JSON.stringify(this);
        };
        return Persona;
    }());
    ABMEmpleados.Persona = Persona;
})(ABMEmpleados || (ABMEmpleados = {}));
