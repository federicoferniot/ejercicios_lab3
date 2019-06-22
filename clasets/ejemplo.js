"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
$(document).ready(function () {
    $('#agregarBtn').click(agregar);
});
function saludar(mi) {
    console.log(mi.hacerRuido());
}
var lista = new Array();
lista.forEach(saludar);
function agregar() {
    var nombre = String($('#nombre').val());
    var animalTmp = null;
    switch ($('#tipo').val()) {
        case "1":
            animalTmp = new animal.Perro(nombre);
            break;
        case "2":
            animalTmp = new animal.Gato(nombre);
            break;
    }
    if (animalTmp != null) {
        lista.push(animalTmp);
        var body = $("#animalesBody");
        var animalTr = document.createElement("tr");
        var nombreTd = document.createElement("td");
        var tipoTd = document.createElement("td");
        nombreTd.innerHTML = nombre;
        tipoTd.innerHTML = $('#tipo option:selected').text();
        animalTr.appendChild(nombreTd);
        animalTr.appendChild(tipoTd);
        body.append(animalTr);
        console.log("Agregado ");
    }
}
function eliminar() {
}
function modificar() {
}
