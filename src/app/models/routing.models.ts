export interface PreviajeDataCreate {
    previajeID: string;
    zona: string;
    start_lat: string;
    start_lng: string;
    end_lat: string;
    end_lng: string;
}

export interface Previaje {
    uuid: string;
    previajeID: string;
    origen: any;
    destino: any;
    ruta: any;
    tarifa: any;
    date: string;
    phone_number: string;
    nota: string;
    medioDePago: boolean;
    estimatedTime: number;
    estimatedDistance: number;
    estimatedCost: number;
    estimatedWaitTime: number;
    estado: string;
}