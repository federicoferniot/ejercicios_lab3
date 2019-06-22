import * as $ from "jquery";

$(document).ready(function(){
    $('#guardarBtn').on("click", (event) => {event.preventDefault();
        ABMEmpleados.Manejadora.agregarEmpleado();})
});
