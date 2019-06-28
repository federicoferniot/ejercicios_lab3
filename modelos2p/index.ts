"use strict";
$(document).ready(function () {
    ABMEmpleados.Manejadora.mostrarEmpleados();
    $('#guardarBtn').on("click", function (event) {
        event.preventDefault();
        ABMEmpleados.Manejadora.agregarEmpleado();
    });
    $('#filtrarNombre').on("click", function(event){
        event.preventDefault();
        ABMEmpleados.Manejadora.soloNombreYApellido();
    });
    $('#btnFiltrarHorario').on("click", function(event){
        event.preventDefault();
        ABMEmpleados.Manejadora.filtrarPorHorario();
    });
});