"use strict";
var ABMVehiculos;
(function (ABMVehiculos) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, marca, modelo, precio) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        Vehiculo.prototype.vehiculoToJson = function () {
            return JSON.stringify(this);
        };
        return Vehiculo;
    }());
    ABMVehiculos.Vehiculo = Vehiculo;
})(ABMVehiculos || (ABMVehiculos = {}));
