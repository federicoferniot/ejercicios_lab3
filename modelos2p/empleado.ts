namespace ABMEmpleados{
    export class Empleado extends Persona{
        horario: string;
        legajo: number;

        constructor(nombre: string, apellido: string, edad:number, horario:string, legajo:number){
            super(nombre, apellido, edad);
            this.horario = horario;
            this.legajo = legajo;
        }

        empleadoToJson(): string{
            return JSON.stringify(this);
        }
    }
}