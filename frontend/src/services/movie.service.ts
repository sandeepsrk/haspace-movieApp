
import http from "../http/http-common";
import {Movie} from "../types/movie"

class MoviesDataService {
  getAll() {
    return http.get<Array<Movie>>("/");
  }

  get(id: string) {
    return http.get<Movie>(`/${id}`);
  }

  create(file:any) {
    return http.post<any>("/", file);
  }

  update(data: Movie, id: any) {
    return http.put<any>(`/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/${id}`);
  }

  findByTitle(title: string) {
    return http.get<Array<Movie>>(`?title=${title}`);
  }
}

export default new MoviesDataService();