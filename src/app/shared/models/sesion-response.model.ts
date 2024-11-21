export interface SesionResponse {
    id: number;
    fecha: Date;
    estado: string;
    horario:{
        id: number;
        hora_inicio: string;
        hora_fin: string;
    }
    adultomayorId: number;
    voluntarioId: number;
    duracion: number;
    adultomayorNombre: string;
    voluntarioNombre: string;
    tipoSesion: string;

}