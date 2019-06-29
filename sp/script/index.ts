"use strict";
$(document).ready(function () {
    $('#lblPuertas').hide();
    $('#Puertas').hide();
    ABMVehiculos.Manejadora.mostrarVehiculos();
    $('#guardarBtn').on("click", function(event){
        ABMVehiculos.Manejadora.agregarVehiculo();
    });
    $('#limpiar').on("click", function(event){
        event.preventDefault();
        if(localStorage.getItem("vehiculos") != null){
            localStorage.removeItem("vehiculos");
            ABMVehiculos.Manejadora.limpiarLista();
            ABMVehiculos.Manejadora.cargarVehiculos();
        }
    });
    $('#autos').on("click", function(event){
        event.preventDefault();
        ABMVehiculos.Manejadora.filtrarAutos();
    }),
    $('#camionetas').on("click", function(event){
        event.preventDefault();
        ABMVehiculos.Manejadora.filtrarCamionetas();
    })
    $('#promedio').on("click", function(event){
        event.preventDefault();
        ABMVehiculos.Manejadora.mostrarPromedio();
    })
    $('#Tipo').on("change", function(event){
        let value = $('#Tipo').val();
        console.log(value);
        if(value == "Camioneta"){
            $('#lblPuertas').hide();
            $('#Puertas').hide();
            $('#lblCuatroXCuatro').show();
            $('#cuatroXcuatro').show();
        }else{
            $('#lblPuertas').show();
            $('#Puertas').show();
            $('#lblCuatroXCuatro').hide();
            $('#cuatroXcuatro').hide();
        }
    });
});