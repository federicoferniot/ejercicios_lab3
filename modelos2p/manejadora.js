"use strict";
var ABMEmpleados;
(function (ABMEmpleados) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.agregarEmpleado = function () {
            var empleado = Manejadora.crearEmpleado();
            Manejadora.empleados.push(empleado.empleadoToJson());
            Manejadora.agregarPersonaLista(empleado, Manejadora.ultimoId);
            Manejadora.agregarPersonaLocalStorage(empleado, empleado.legajo);
        };
        Manejadora.crearEmpleado = function () {
            var nombre = $('#nombre').val();
            var apellido = $('#apellido').val();
            var edad = $('#edad').val();
            var legajo = $('#legajo').val();
            var horario = $('#horario').val();
            return new ABMEmpleados.Empleado(nombre, apellido, edad, horario, legajo);
        };
        Manejadora.limpiarFormulario = function () {
            var guardarBtn = $('#guardarBtn');
            guardarBtn.html("Guardar");
            guardarBtn.attr("modificando", "");
            guardarBtn.click(function (event) {
                event.preventDefault();
                Manejadora.agregarEmpleado();
            });
        };
        Manejadora.cargarEmpleados = function () {
            Manejadora.ultimoId = 0;
            var lsEmpleados = localStorage.getItem("empleados");
            if (lsEmpleados != null) {
                lsEmpleados = JSON.parse(lsEmpleados);
                if (lsEmpleados != null)
                    Manejadora.empleados = lsEmpleados;
            }
        };
        Manejadora.mostrarEmpleados = function () {
            Manejadora.limpiarLista();
            Manejadora.cargarEmpleados();
            Manejadora.cargarLista();
            Manejadora.ultimoId = Manejadora.empleados.length;
        };
        Manejadora.cargarLista = function () {
            for (var i = 0; i < Manejadora.empleados.length; i++) {
                Manejadora.agregarPersonaLista(JSON.parse(Manejadora.empleados[i]), i);
            }
        };
        Manejadora.agregarPersonaLocalStorage = function (empleado, legajo) {
            var lsEmpleados = localStorage.getItem("empleados");
            var empleados = [];
            if (lsEmpleados != null) {
                empleados = JSON.parse(lsEmpleados);
            }
            empleados.push(empleado.empleadoToJson());
            localStorage.setItem("empleados", JSON.stringify(empleados));
            Manejadora.ultimoId += 1;
        };
        Manejadora.agregarPersonaLista = function (empleado, i) {
            var tbody = $('#tbody');
            var tr = document.createElement("tr");
            Object.values(empleado).forEach(function (value) {
                var td = document.createElement("td");
                var tdText = document.createTextNode(value);
                td.appendChild(tdText);
                tr.appendChild(td);
            });
            tr.setAttribute("id", String(i));
            var acciones = document.createElement("td");
            var aBorrar = document.createElement("a");
            var iBorrar = document.createElement("i");
            iBorrar.className = "fas fa-trash-alt";
            aBorrar.className = 'delete';
            aBorrar.appendChild(iBorrar);
            aBorrar.addEventListener("click", this.eventEliminar);
            var aModificar = document.createElement("a");
            aModificar.className = 'edit';
            aModificar.addEventListener("click", this.eventModificar);
            var iModificar = document.createElement("i");
            iModificar.className = "fas fa-edit";
            aModificar.appendChild(iModificar);
            acciones.appendChild(aBorrar);
            acciones.appendChild(aModificar);
            tr.appendChild(acciones);
            tbody.append(tr);
        };
        Manejadora.eventModificar = function (event) {
            var target = event.currentTarget;
            var tr = target.closest("tr");
            if (tr != null) {
                var empleado = JSON.parse(Manejadora.empleados[Number(tr.id)]);
                $('#nombre').val(empleado.nombre);
                $('#apellido').val(empleado.apellido);
                $('#edad').val(empleado.edad);
                $('#legajo').val(empleado.legajo);
                $('#horario').val(empleado.horario);
                $('#formularioH2').html("Modificar empleado");
                var guardarBtn = $('#guardarBtn');
                guardarBtn.html("Modificar");
                guardarBtn.attr("modificando", tr.id);
                guardarBtn.off();
                guardarBtn.click(function (event) {
                    event.preventDefault();
                    Manejadora.modificar(Number(event.target.getAttribute("modificando")));
                    Manejadora.limpiarLista();
                    Manejadora.mostrarEmpleados();
                    Manejadora.limpiarFormulario();
                });
            }
        };
        Manejadora.eventEliminar = function (event) {
            var target = event.target;
            var tr = target.closest("tr");
            if (tr != null) {
                Manejadora.eliminar(Number(tr.id));
                Manejadora.limpiarLista();
                Manejadora.mostrarEmpleados();
                Manejadora.limpiarFormulario();
            }
        };
        Manejadora.limpiarLista = function () {
            $("#tbody").html("");
            $('#thEdad').show();
            $('#thLegajo').show();
            $('#thTurno').show();
        };
        Manejadora.modificar = function (i) {
            Manejadora.empleados[i] = Manejadora.crearEmpleado().empleadoToJson();
            localStorage.setItem("empleados", JSON.stringify(Manejadora.empleados));
        };
        Manejadora.eliminar = function (i) {
            var lsEmpleados = localStorage.getItem("empleados");
            var empleados = [];
            if (lsEmpleados != null) {
                empleados = JSON.parse(lsEmpleados);
            }
            empleados.splice(i, 1);
            localStorage.setItem("empleados", JSON.stringify(empleados));
        };
        Manejadora.filtrarPorHorario = function () {
            Manejadora.cargarEmpleados();
            var valor = $('#horarioModalSelect').val();
            Manejadora.empleados = Manejadora.empleados.filter(function (empleado) {
                var oEmpleado = JSON.parse(empleado);
                return (oEmpleado.horario == valor);
            });
            Manejadora.limpiarLista();
            Manejadora.cargarLista();
        };
        Manejadora.promedioEdadPorHorario = function () {
        };
        Manejadora.soloNombreYApellido = function () {
            Manejadora.cargarEmpleados();
            Manejadora.empleados = Manejadora.empleados.map(function (empleado) {
                var oEmpleado = JSON.parse(empleado);
                return JSON.stringify({ nombre: oEmpleado.nombre, apellido: oEmpleado.apellido });
            });
            Manejadora.limpiarLista();
            Manejadora.cargarLista();
            $('#thEdad').hide();
            $('#thLegajo').hide();
            $('#thTurno').hide();
        };
        Manejadora.empleados = new Array();
        Manejadora.ultimoId = 0;
        return Manejadora;
    }());
    ABMEmpleados.Manejadora = Manejadora;
})(ABMEmpleados || (ABMEmpleados = {}));
