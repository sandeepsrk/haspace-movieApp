import './styles.css';
import React from "react";

type Props = {
    duration: number;
    genre: string;
}

function MovieScore({ duration, genre } : Props) {
    
    return (
        <div className="movie-score-container">
            <p className="movie-score-value">{duration > 0 ? duration +' min' : '-'}</p>
            <p className="movie-score-count">{genre} </p>
        </div>
    );
}

export default MovieScore;