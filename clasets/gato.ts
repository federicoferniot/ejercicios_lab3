namespace animal{
    export class Gato implements Animal{
        private nombre:string;

        constructor(nombre:string){
            this.nombre = nombre;
        }

        hacerRuido(): string {
            return "Miau!";
        }
    }
}