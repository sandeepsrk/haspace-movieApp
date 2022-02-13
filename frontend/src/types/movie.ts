export type Movie = {
    _id: string;
    title: string;
    description: string;
    duration: number;
    genre: string;
    image: any;
}

export type MoviePage = {
    content: Movie[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface FormIStatus {
    message: string
    type: string
}
export interface FormIStatusProps {
    [key: string]: FormIStatus
}