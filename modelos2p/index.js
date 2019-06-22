"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
$(document).ready(function () {
    $('#guardarBtn').on("click", function (event) {
        event.preventDefault();
        ABMEmpleados.Manejadora.agregarEmpleado();
    });
});
