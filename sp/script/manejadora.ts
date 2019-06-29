namespace ABMVehiculos{
    export class Manejadora{
        static vehiculos: Array<Vehiculo>;

        static agregarVehiculo(): void {
            let marca:string = <string>$('#Marca').val();
            let modelo:string = <string>$('#Modelo').val();
            let precio:string = <string>$('#Precio').val();
            if(marca!= "" && modelo != "" && precio !=""){
                let vehiculo:ABMVehiculos.Vehiculo
                if(<string>$('#Tipo').val() == "Camioneta"){
                    vehiculo = Manejadora.crearCamioneta();
                }else{
                    vehiculo = Manejadora.crearAuto();
                }
                Manejadora.vehiculos.push(vehiculo);

                Manejadora.agregarVehiculoLista(vehiculo);
                Manejadora.agregarVehiculoLocalStorage(vehiculo);
                //$('#exampleModalCenter').hide();
            }
        }

        static ultimoId():number{
            let Vaux:ABMVehiculos.Vehiculo;
            Vaux = Manejadora.vehiculos.reduce(function(a, b):Vehiculo{
                if(a.id > b.id) return a;
                return b;
            }, new ABMVehiculos.Vehiculo(0, "", "", 0));

            return Vaux.id;
        }

        static crearAuto(): ABMVehiculos.Auto{
            let id:number = Manejadora.ultimoId() + 1;
            let marca:string = <string>$('#Marca').val();
            let modelo:string = <string>$('#Modelo').val();
            let precio:number = <number>$('#Precio').val();
            let cantidadPuertas:number = <number>$('#Tipo').val();

            return new ABMVehiculos.Auto(id, marca, modelo, precio, cantidadPuertas);
        }

        static crearCamioneta(): ABMVehiculos.Camioneta{
            let id:number = Manejadora.ultimoId() + 1;
            let marca:string = <string>$('#Marca').val();
            let modelo:string = <string>$('#Modelo').val();
            let precio:number = <number>$('#Precio').val();
            let cuatroXcuatro:string = <string>$('#cuatroXcuatro').val();

            return new ABMVehiculos.Camioneta(id, marca, modelo, precio, Boolean(cuatroXcuatro));
        }

        static cargarVehiculos():void{
            let lsVehiculos = localStorage.getItem("vehiculos");
            if(lsVehiculos != null){
                let array = <Array<Vehiculo>>JSON.parse(lsVehiculos);
                if(lsVehiculos != null){
                    Manejadora.vehiculos = array;
                }
            }else
            {
                Manejadora.vehiculos = new Array<Vehiculo>();
            }
        }

        static mostrarVehiculos(): void{
            Manejadora.limpiarLista();
            Manejadora.cargarVehiculos();
            Manejadora.cargarLista();
        }

        static cargarLista():void{
            for(var i=0; i < Manejadora.vehiculos.length; i++){
                Manejadora.agregarVehiculoLista(Manejadora.vehiculos[i]);
            }
        }

        static agregarVehiculoLocalStorage(vehiculo: ABMVehiculos.Vehiculo): void{
            let lsVehiculos = localStorage.getItem("vehiculos");
            let vehiculos = [];
            if(lsVehiculos != null){
                vehiculos = JSON.parse(lsVehiculos);
            }
            vehiculos.push(vehiculo);
            localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
        }

        private static agregarVehiculoLista(vehiculo: ABMVehiculos.Vehiculo): void{
            let tbody = $('#tbody');
            let tr = document.createElement("tr");
            Object.values(vehiculo).forEach(function(value){
                let td = document.createElement("td");
                let tdText = document.createTextNode(value);
                td.appendChild(tdText);
                tr.appendChild(td);
            });
            if(tr.lastChild != null)
                tr.removeChild(tr.lastChild);
            tr.setAttribute("id", String(vehiculo.id));
            let acciones = document.createElement("td");
            let aBorrar = document.createElement("a");
            let iBorrar = document.createElement("i");
            iBorrar.className = "fas fa-trash-alt";
            aBorrar.className = 'delete';
            aBorrar.appendChild(iBorrar);
            aBorrar.addEventListener("click", this.eventEliminar);
            acciones.appendChild(aBorrar);
            tr.appendChild(acciones);
            tbody.append(tr);
        }

        static eventEliminar(event: MouseEvent):void{
            let target = <HTMLElement>event.target;
            let tr = target.closest("tr");
            if(tr != null) {
                Manejadora.eliminar(Number(tr.id));
                Manejadora.limpiarLista();
                Manejadora.mostrarVehiculos();
                Manejadora.limpiarFormulario();
            }
        }

        static limpiarLista():void {
            $("#tbody").html("");
            $('#thEdad').show();
            $('#thLegajo').show();
            $('#thTurno').show();
        }

        static eliminar(i:number): void{
            let lsVehiculos = localStorage.getItem("vehiculos");
            if(lsVehiculos != null){
                let array = <Array<Vehiculo>>JSON.parse(lsVehiculos);
                if(lsVehiculos != null){
                    Manejadora.vehiculos = array;
                }
            }
            let aux = Manejadora.vehiculos.filter(function(value){
                return value.id != i;
            })
            localStorage.setItem("vehiculos", JSON.stringify(aux));
        }


        static mostrarPromedio(): void{
            let Vaux:ABMVehiculos.Vehiculo;
            Vaux = Manejadora.vehiculos.reduce(function(a, b):Vehiculo{
                console.log(a);
                return new ABMVehiculos.Vehiculo(0, "", "", (Number(a.precio)) + (Number(b.precio)));
            }, new ABMVehiculos.Vehiculo(0, "", "", 0));
            if(Manejadora.vehiculos.length >0){
                $('#promedioInp').val(Number(Vaux.precio)/Manejadora.vehiculos.length);
            }
        }

        static filtrarAutos():void{
            Manejadora.cargarVehiculos();
            Manejadora.vehiculos = Manejadora.vehiculos.filter(function(value){
                return ('cantidadPuertas' in value);
            });
            Manejadora.limpiarLista();
            Manejadora.cargarLista();
        }

        static filtrarCamionetas():void{
            Manejadora.cargarVehiculos();
            Manejadora.vehiculos = Manejadora.vehiculos.filter(function(value){
                return ('cuatroXcuatro' in value);
            });
            Manejadora.limpiarLista();
            Manejadora.cargarLista();
        }
/*
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
        }*/
    }
}