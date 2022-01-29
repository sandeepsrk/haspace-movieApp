import { Router } from 'express';
import MoviesController from '@controllers/movies.controller';
import { CreateMovieDto } from '@dtos/movies.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  
  filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname)
  }
});
const fileFilter = (req: any,file: any,cb: any) => {
  if(file.mimetype === "image/jpg"  || 
     file.mimetype ==="image/jpeg"  || 
     file.mimetype ===  "image/png"){
   
  cb(null, true);
 }else{
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}
}
const upload = multer({storage: storage, fileFilter : fileFilter});

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
    this.router.post(`${this.path}`, validationMiddleware(CreateMovieDto, 'body'),upload.array('images',5),this.moviesController.createMovie);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateMovieDto, 'body', true), this.moviesController.updateMovie);
    this.router.delete(`${this.path}/:id`, this.moviesController.deleteMovie);
  }
}

export default MoviesRoute;
