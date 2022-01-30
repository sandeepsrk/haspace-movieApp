
export interface Movie {
    title: string;
    description: string;
    duration: number;
    genre: string;
    image: any;
}

export interface FormIStatus {
    message: string
    type: string
}
export interface FormIStatusProps {
    [key: string]: FormIStatus
}