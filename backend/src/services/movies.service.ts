import { hash } from 'bcrypt';
import { CreateMovieDto } from '@dtos/movies.dto';
import { HttpException } from '@exceptions/HttpException';
import { Movie } from '@interfaces/movies.interface';
import movieModel from '@/models/movies.model';
import { isEmpty } from '@utils/util';

class MovieService {
  public movies = movieModel;

  public async findAllMovies(): Promise<Movie[]> {
    const movies: Movie[] = await this.movies.find();
    return movies;
  }

  public async findMovieById(movieId: string): Promise<Movie> {
    if (isEmpty(movieId)) throw new HttpException(400, "No movie id");

    const findMovie: Movie = await this.movies.findOne({ _id: movieId });
    if (!findMovie) throw new HttpException(409, "Requested movie not found");

    return findMovie;
  }

  public async createMovie(movieData: CreateMovieDto): Promise<Movie> {
    if (isEmpty(movieData)) throw new HttpException(400, "Movie Data empty");

    const findMovie: Movie = await this.movies.findOne({ title: movieData.title });
    if (findMovie) throw new HttpException(409, `Movie named ${movieData.title} already exists`);

    const createMovieData: Movie = await this.movies.create({ ...movieData});

    return createMovieData;
  }

  public async updateMovie(movieId: string, movieData: CreateMovieDto): Promise<Movie> {
    if (isEmpty(movieData)) throw new HttpException(400, "No movie data");

    if (movieData.title) {
      const findMovie: Movie = await this.movies.findOne({ title: movieData.title });
      if (findMovie && findMovie._id != movieId) throw new HttpException(409, `Movie with title ${movieData.title} does not exists`);
    }

    const updateMovieById: Movie = await this.movies.findByIdAndUpdate(movieId, { ...movieData });
    if (!updateMovieById) throw new HttpException(409, "No movie found");

    return updateMovieById;
  }

  public async deleteMovie(movieId: string): Promise<Movie> {
    const deleteMovieById: Movie = await this.movies.findByIdAndDelete(movieId);
    if (!deleteMovieById) throw new HttpException(409, "No movie found");

    return deleteMovieById;
  }
}

export default MovieService;
