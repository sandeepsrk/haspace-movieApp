import { model, Schema, Document } from 'mongoose';
import { Movie } from '@interfaces/movies.interface';

const movieSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
});

const movieModel = model<Movie & Document>('Movie', movieSchema);

export default movieModel;
