export interface State {
    id: number;
    sigla: string;
    nome: string;
}

export interface City {
    id: number;
    nome: string;
    estado: string;
    uf: string;
    ibge: string;
    ddd: string;
}