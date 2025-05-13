export interface Movie {
    id: number;
    name: string;
    duration: number;
    description: string;
}

export interface CreateMovie {
    name: string;
    duration: number;
    description: string;
}

export interface UpdateMovie {
    name?: string;
    duration?: number;
    description?: string;
}

export interface GetMoviesQueryParams {
    match?: string;
}
