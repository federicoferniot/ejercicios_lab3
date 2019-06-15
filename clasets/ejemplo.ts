$(document).ready(function(){
    $('#agregarBtn').click(agregar);
});


function saludar(mi:animal.Animal){
    console.log(mi.hacerRuido());
}

var lista:Array<animal.Animal> = new Array<animal.Animal>();
lista.forEach(saludar);


function agregar():void{
    let nombre:string = String($('#nombre').val());
    let animalTmp:animal.Animal | null= null;
    switch($('#tipo').val()){
        case "1":
            animalTmp = new animal.Perro(nombre);
            break;
        case "2":
            animalTmp = new animal.Gato(nombre);
            break;
    }
    if(animalTmp != null){
        lista.push(animalTmp);
        let body = $("#animalesBody");
        let animalTr = document.createElement("tr");
        let nombreTd = document.createElement("td");
        let tipoTd = document.createElement("td");
        nombreTd.innerHTML = nombre;
        tipoTd.innerHTML = $('#tipo option:selected').text();
        animalTr.appendChild(nombreTd);
        animalTr.appendChild(tipoTd);
        body.append(animalTr);
        console.log("Agregado ");
    }
}

function eliminar(){

}

function modificar(){
    
}