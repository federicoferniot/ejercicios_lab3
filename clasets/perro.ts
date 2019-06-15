namespace animal{
    export class Perro implements Animal{
        private nombre:string;

        hacerRuido():string{
            return "Guau!";
        }

        constructor(nombre?:string){
            if(nombre!=undefined){
                this.nombre = nombre;
            }
        }

        getNombre():string{
            return this.nombre;
        }

        setNombre(nombre:string){
            this.nombre = nombre;
        }
    }
}