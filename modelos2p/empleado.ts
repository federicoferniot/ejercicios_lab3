namespace ABMEmpleados{
    export class Empleado extends Persona{
        public legajo: number;
        public horario: string;


        constructor(nombre: string, apellido: string, edad:number, horario:string, legajo:number){
            super(nombre, apellido, edad);
            this.legajo = legajo;
            this.horario = horario;
        }

        empleadoToJson(): string{
            return JSON.stringify(this);
        }
    }
}