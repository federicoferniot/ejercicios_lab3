namespace ABMEmpleados{
    export class Manejadora{
        static empleados: Array<string> = new Array<string>();
        static ultimoId: number = 0;

        static agregarEmpleado(): void {
            let empleado:ABMEmpleados.Empleado = Manejadora.crearEmpleado();
            Manejadora.empleados.push(empleado.empleadoToJson());

            Manejadora.agregarPersonaLista(empleado, Manejadora.ultimoId);
            Manejadora.agregarPersonaLocalStorage(empleado, empleado.legajo);
        }

        static crearEmpleado(): ABMEmpleados.Empleado{
            let nombre:string = <string>$('#nombre').val();
            let apellido:string = <string>$('#apellido').val();
            let edad:number = <number>$('#edad').val();
            let legajo:number = <number>$('#legajo').val();
            let horario:string = <string>$('#horario').val();

            return new ABMEmpleados.Empleado(nombre, apellido, edad, horario, legajo);
        }

        static limpiarFormulario(): void{
            let guardarBtn = $('#guardarBtn');
            guardarBtn.html("Guardar");
            guardarBtn.attr("modificando","");
            guardarBtn.click(function(event){
                event.preventDefault();
                Manejadora.agregarEmpleado();
            });
        }

        static cargarEmpleados():void{
            Manejadora.ultimoId = 0;
            let lsEmpleados = localStorage.getItem("empleados");
            if(lsEmpleados != null){
                lsEmpleados = JSON.parse(lsEmpleados);
                if(lsEmpleados != null)
                    Manejadora.empleados = <Array<string>> <unknown>lsEmpleados;
            }
        }

        static mostrarEmpleados(): void{
            Manejadora.limpiarLista();
            Manejadora.cargarEmpleados();
            Manejadora.cargarLista();
            Manejadora.ultimoId = Manejadora.empleados.length;
        }

        static cargarLista():void{
            for(var i=0; i < Manejadora.empleados.length; i++){
                Manejadora.agregarPersonaLista(JSON.parse(Manejadora.empleados[i]), i);
            }
        }

        static agregarPersonaLocalStorage(empleado: ABMEmpleados.Empleado, legajo:number): void{
            let lsEmpleados = localStorage.getItem("empleados");
            let empleados = [];
            if(lsEmpleados != null){
                empleados = JSON.parse(lsEmpleados);
            }
            empleados.push(empleado.empleadoToJson());
            localStorage.setItem("empleados", JSON.stringify(empleados));
            Manejadora.ultimoId += 1;
        }

        private static agregarPersonaLista(empleado: ABMEmpleados.Empleado, i:number): void{
            let tbody = $('#tbody');
            let tr = document.createElement("tr");
            Object.values(empleado).forEach(function(value){
                let td = document.createElement("td");
                let tdText = document.createTextNode(value);
                td.appendChild(tdText);
                tr.appendChild(td);
            });
            tr.setAttribute("id", String(i));
            let acciones = document.createElement("td");
            let aBorrar = document.createElement("a");
            let iBorrar = document.createElement("i");
            iBorrar.className = "fas fa-trash-alt";
            aBorrar.className = 'delete';
            aBorrar.appendChild(iBorrar);
            aBorrar.addEventListener("click", this.eventEliminar);
            let aModificar = document.createElement("a");
            aModificar.className = 'edit';
            aModificar.addEventListener("click", this.eventModificar);
            let iModificar = document.createElement("i");
            iModificar.className = "fas fa-edit";
            aModificar.appendChild(iModificar);
            acciones.appendChild(aBorrar);
            acciones.appendChild(aModificar);
            tr.appendChild(acciones);
            tbody.append(tr);
        }

        static eventModificar(event: MouseEvent):void {
            let target = <HTMLElement>event.currentTarget;
            let tr = target.closest("tr");
            if(tr != null){
                let empleado = JSON.parse(Manejadora.empleados[Number(tr.id)]);
                $('#nombre').val(empleado.nombre);
                $('#apellido').val(empleado.apellido);
                $('#edad').val(empleado.edad);
                $('#legajo').val(empleado.legajo);
                $('#horario').val(empleado.horario);
                $('#formularioH2').html("Modificar empleado");
                let guardarBtn = $('#guardarBtn');
                guardarBtn.html("Modificar");
                guardarBtn.attr("modificando", tr.id)
                guardarBtn.off();
                guardarBtn.click(function(event){
                    event.preventDefault();
                    Manejadora.modificar(Number(event.target.getAttribute("modificando")));
                    Manejadora.limpiarLista();
                    Manejadora.mostrarEmpleados();
                    Manejadora.limpiarFormulario();
                });
            }
        }

        static eventEliminar(event: MouseEvent):void{
            let target = <HTMLElement>event.target;
            let tr = target.closest("tr");
            if(tr != null) {
                Manejadora.eliminar(Number(tr.id));
                Manejadora.limpiarLista();
                Manejadora.mostrarEmpleados();
                Manejadora.limpiarFormulario();
            }
        }

        static limpiarLista():void {
            $("#tbody").html("");
            $('#thEdad').show();
            $('#thLegajo').show();
            $('#thTurno').show();
        }

        static modificar(i:number): void{
            Manejadora.empleados[i] = Manejadora.crearEmpleado().empleadoToJson();
            localStorage.setItem("empleados", JSON.stringify(Manejadora.empleados));
        }

        static eliminar(i:number): void{
            let lsEmpleados = localStorage.getItem("empleados");
            let empleados = [];
            if(lsEmpleados != null){
                empleados = JSON.parse(lsEmpleados);
            }
            empleados.splice(i, 1);
            localStorage.setItem("empleados", JSON.stringify(empleados));
        }

        static filtrarPorHorario(): void{
            Manejadora.cargarEmpleados();
            let valor = $('#horarioModalSelect').val();
            Manejadora.empleados = Manejadora.empleados.filter(function(empleado){
                let oEmpleado = JSON.parse(empleado);
                return (oEmpleado.horario == valor);
            });
            Manejadora.limpiarLista();
            Manejadora.cargarLista();
        }

        static promedioEdadPorHorario(): void{
            
        }

        static soloNombreYApellido():void{
            Manejadora.cargarEmpleados();
            Manejadora.empleados = Manejadora.empleados.map(function(empleado){
                let oEmpleado = JSON.parse(empleado)
                return JSON.stringify({nombre: oEmpleado.nombre, apellido: oEmpleado.apellido});
            });
            Manejadora.limpiarLista();
            Manejadora.cargarLista();
            $('#thEdad').hide();
            $('#thLegajo').hide();
            $('#thTurno').hide();
        }
    }
}