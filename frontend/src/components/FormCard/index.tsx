import axios, { AxiosRequestConfig } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Movie } from "types/movie";
import { BASE_URL } from 'utils/requests';
import './styles.css';
import React,{useState} from 'react';
import MovieScore from 'components/MovieScore';



function FormCard(props : any) {

const movie: any = props.props
console.log("Props iiiiiiiiiiiiiii",props.props)
const handleClose = () => {
    props.onChange()
}
    return (
        <div className="movie-form-container">
            <img className="movie-movie-card-image" src={movie?.image} alt={movie?.title} />
            <div className="movie-card-bottom-container">
                <h3>{movie?.title}</h3>
                    <div className="form-group movie-form-group">
                    <p style={{textAlign:'justify'}}>{movie.description}</p>
                    </div>
                    <div className="form-group movie-form-group">
                    <MovieScore duration={movie.duration} genre={movie.genre}  />
                    </div>
                    <div className="movie-form-btn-container">
                        <button type="submit" className="btn btn-primary movie-btn" onClick={handleClose}>Close</button>
                    </div>
            </div >
        </div >
    );
}

export default FormCard;