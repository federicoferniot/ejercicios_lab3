"use strict";
var animal;
(function (animal) {
    var Perro = /** @class */ (function () {
        function Perro(nombre) {
            if (nombre != undefined) {
                this.nombre = nombre;
            }
        }
        Perro.prototype.hacerRuido = function () {
            return "Guau!";
        };
        Perro.prototype.getNombre = function () {
            return this.nombre;
        };
        Perro.prototype.setNombre = function (nombre) {
            this.nombre = nombre;
        };
        return Perro;
    }());
    animal.Perro = Perro;
})(animal || (animal = {}));
