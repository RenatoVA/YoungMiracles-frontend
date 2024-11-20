export interface FacturaResponse {
    facturaId: number;
    usuarioId: number;
    voluntarioId: number;
    fecha: string;
    total: number;
    servicio: string;
    estado: string;
}
