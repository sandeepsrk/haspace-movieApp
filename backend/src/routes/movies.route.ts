import { Router } from 'express';
import MoviesController from '@controllers/movies.controller';
import { CreateMovieDto } from '@dtos/movies.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/');
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});
class MoviesRoute implements Routes {
  public path = '/movies';
  public router = Router();
  public moviesController = new MoviesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.moviesController.getMovies);
    this.router.get(`${this.path}/:id`, this.moviesController.getMovieById);
    this.router.post(`${this.path}`, upload.single('file'),this.moviesController.createMovie);
    this.router.put(`${this.path}/:id`,  upload.single('file'),this.moviesController.updateMovie);
    this.router.delete(`${this.path}/:id`, this.moviesController.deleteMovie);
  }
}

export default MoviesRoute;
