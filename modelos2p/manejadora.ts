namespace ABMEmpleados{
    export class Manejadora{
        static empleados: Array<Empleado> = new Array<Empleado>();

        static agregarEmpleado(): void {
            let nombre:string = <string>$('#nombre').val();
            let apellido:string = <string>$('#apellido').val();
            let edad:number = <number>$('#edad').val();
            let legajo:number = <number>$('#legajo').val();
            let horario:string = <string>$('#horario').val();

            let empleado:ABMEmpleados.Empleado = new ABMEmpleados.Empleado(nombre, apellido, edad, horario, legajo);
            Manejadora.empleados.push(empleado);

            Manejadora.mostrarEmpleados();
            console.log(empleado.empleadoToJson());
        }

        static limpiarFormulario(): void{

        }

        static mostrarEmpleados(): void{
            for(var i=0; i < Manejadora.empleados.length; i++){
                Manejadora.agregarPersonaLista(Manejadora.empleados[i]);
            }
        }

        private static agregarPersonaLista(empleado: ABMEmpleados.Empleado): void{
            let tbody = $('#tbody');
            let tr = document.createElement("tr");
            let nombre = document.createElement("td");
            let nombretxt = document.createTextNode(empleado.nombre);
            nombre.appendChild(nombretxt);
            tr.appendChild(nombre);
            tbody.append(tr);
        }

        static modificar(i:number): void{

        }

        static eliminar(i:number): void{

        }

        static filtrarPorHorario(): void{

        }

        static promedioEdadPorHorario(): void{
            
        }
    }
}