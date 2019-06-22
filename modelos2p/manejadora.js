"use strict";
var ABMEmpleados;
(function (ABMEmpleados) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.agregarEmpleado = function () {
            var nombre = $('#nombre').val();
            var apellido = $('#apellido').val();
            var edad = $('#edad').val();
            var legajo = $('#legajo').val();
            var horario = $('#horario').val();
            var empleado = new ABMEmpleados.Empleado(nombre, apellido, edad, horario, legajo);
            Manejadora.empleados.push(empleado);
            Manejadora.mostrarEmpleados();
            console.log(empleado.empleadoToJson());
        };
        Manejadora.limpiarFormulario = function () {
        };
        Manejadora.mostrarEmpleados = function () {
            for (var i = 0; i < Manejadora.empleados.length; i++) {
                Manejadora.agregarPersonaLista(Manejadora.empleados[i]);
            }
        };
        Manejadora.agregarPersonaLista = function (empleado) {
            var tbody = $('#tbody');
            var tr = document.createElement("tr");
            var nombre = document.createElement("td");
            var nombretxt = document.createTextNode(empleado.nombre);
            nombre.appendChild(nombretxt);
            tr.appendChild(nombre);
            tbody.append(tr);
        };
        Manejadora.modificar = function (i) {
        };
        Manejadora.eliminar = function (i) {
        };
        Manejadora.filtrarPorHorario = function () {
        };
        Manejadora.promedioEdadPorHorario = function () {
        };
        Manejadora.empleados = new Array();
        return Manejadora;
    }());
    ABMEmpleados.Manejadora = Manejadora;
})(ABMEmpleados || (ABMEmpleados = {}));
