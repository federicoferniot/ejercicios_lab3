"use strict";
var ABMVehiculos;
(function (ABMVehiculos) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.agregarVehiculo = function () {
            var marca = $('#Marca').val();
            var modelo = $('#Modelo').val();
            var precio = $('#Precio').val();
            if (marca != "" && modelo != "" && precio != "") {
                var vehiculo = void 0;
                if ($('#Tipo').val() == "Camioneta") {
                    vehiculo = Manejadora.crearCamioneta();
                }
                else {
                    vehiculo = Manejadora.crearAuto();
                }
                Manejadora.vehiculos.push(vehiculo);
                Manejadora.agregarVehiculoLista(vehiculo);
                Manejadora.agregarVehiculoLocalStorage(vehiculo);
                //$('#exampleModalCenter').hide();
            }
        };
        Manejadora.ultimoId = function () {
            var Vaux;
            Vaux = Manejadora.vehiculos.reduce(function (a, b) {
                if (a.id > b.id)
                    return a;
                return b;
            }, new ABMVehiculos.Vehiculo(0, "", "", 0));
            return Vaux.id;
        };
        Manejadora.crearAuto = function () {
            var id = Manejadora.ultimoId() + 1;
            var marca = $('#Marca').val();
            var modelo = $('#Modelo').val();
            var precio = $('#Precio').val();
            var cantidadPuertas = $('#Tipo').val();
            return new ABMVehiculos.Auto(id, marca, modelo, precio, cantidadPuertas);
        };
        Manejadora.crearCamioneta = function () {
            var id = Manejadora.ultimoId() + 1;
            var marca = $('#Marca').val();
            var modelo = $('#Modelo').val();
            var precio = $('#Precio').val();
            var cuatroXcuatro = $('#cuatroXcuatro').val();
            return new ABMVehiculos.Camioneta(id, marca, modelo, precio, Boolean(cuatroXcuatro));
        };
        Manejadora.cargarVehiculos = function () {
            var lsVehiculos = localStorage.getItem("vehiculos");
            if (lsVehiculos != null) {
                var array = JSON.parse(lsVehiculos);
                if (lsVehiculos != null) {
                    Manejadora.vehiculos = array;
                }
            }
            else {
                Manejadora.vehiculos = new Array();
            }
        };
        Manejadora.mostrarVehiculos = function () {
            Manejadora.limpiarLista();
            Manejadora.cargarVehiculos();
            Manejadora.cargarLista();
        };
        Manejadora.cargarLista = function () {
            for (var i = 0; i < Manejadora.vehiculos.length; i++) {
                Manejadora.agregarVehiculoLista(Manejadora.vehiculos[i]);
            }
        };
        Manejadora.agregarVehiculoLocalStorage = function (vehiculo) {
            var lsVehiculos = localStorage.getItem("vehiculos");
            var vehiculos = [];
            if (lsVehiculos != null) {
                vehiculos = JSON.parse(lsVehiculos);
            }
            vehiculos.push(vehiculo);
            localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
        };
        Manejadora.agregarVehiculoLista = function (vehiculo) {
            var tbody = $('#tbody');
            var tr = document.createElement("tr");
            Object.values(vehiculo).forEach(function (value) {
                var td = document.createElement("td");
                var tdText = document.createTextNode(value);
                td.appendChild(tdText);
                tr.appendChild(td);
            });
            if (tr.lastChild != null)
                tr.removeChild(tr.lastChild);
            tr.setAttribute("id", String(vehiculo.id));
            var acciones = document.createElement("td");
            var aBorrar = document.createElement("a");
            var iBorrar = document.createElement("i");
            iBorrar.className = "fas fa-trash-alt";
            aBorrar.className = 'delete';
            aBorrar.appendChild(iBorrar);
            aBorrar.addEventListener("click", this.eventEliminar);
            acciones.appendChild(aBorrar);
            tr.appendChild(acciones);
            tbody.append(tr);
        };
        Manejadora.eventEliminar = function (event) {
            var target = event.target;
            var tr = target.closest("tr");
            if (tr != null) {
                Manejadora.eliminar(Number(tr.id));
                Manejadora.limpiarLista();
                Manejadora.mostrarVehiculos();
                Manejadora.limpiarFormulario();
            }
        };
        Manejadora.limpiarLista = function () {
            $("#tbody").html("");
            $('#thEdad').show();
            $('#thLegajo').show();
            $('#thTurno').show();
        };
        Manejadora.eliminar = function (i) {
            var lsVehiculos = localStorage.getItem("vehiculos");
            if (lsVehiculos != null) {
                var array = JSON.parse(lsVehiculos);
                if (lsVehiculos != null) {
                    Manejadora.vehiculos = array;
                }
            }
            var aux = Manejadora.vehiculos.filter(function (value) {
                return value.id != i;
            });
            localStorage.setItem("vehiculos", JSON.stringify(aux));
        };
        Manejadora.mostrarPromedio = function () {
            var Vaux;
            Vaux = Manejadora.vehiculos.reduce(function (a, b) {
                console.log(a);
                return new ABMVehiculos.Vehiculo(0, "", "", (Number(a.precio)) + (Number(b.precio)));
            }, new ABMVehiculos.Vehiculo(0, "", "", 0));
            if (Manejadora.vehiculos.length > 0) {
                $('#promedioInp').val(Number(Vaux.precio) / Manejadora.vehiculos.length);
            }
        };
        Manejadora.filtrarAutos = function () {
            Manejadora.cargarVehiculos();
            Manejadora.vehiculos = Manejadora.vehiculos.filter(function (value) {
                return ('cantidadPuertas' in value);
            });
            Manejadora.limpiarLista();
            Manejadora.cargarLista();
        };
        Manejadora.filtrarCamionetas = function () {
            Manejadora.cargarVehiculos();
            Manejadora.vehiculos = Manejadora.vehiculos.filter(function (value) {
                return ('cuatroXcuatro' in value);
            });
            Manejadora.limpiarLista();
            Manejadora.cargarLista();
        };
        return Manejadora;
    }());
    ABMVehiculos.Manejadora = Manejadora;
})(ABMVehiculos || (ABMVehiculos = {}));
