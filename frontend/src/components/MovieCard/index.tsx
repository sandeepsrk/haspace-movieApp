import MovieScore from "../MovieScore";
import { Link } from 'react-router-dom';
import { Movie } from "types/movie";
import React,{useState} from "react";
import './styles.css';
import axios from "axios";
import { BASE_URL } from "utils/requests";
import { useReload, Reload } from '../../context/movieContext';
import Modal from 'react-bootstrap/Modal'
import AddMovie from '../../components/AddMovie/index'
import FormCard from "components/FormCard";
import  swal from 'sweetalert';


type Props = {
    movie: Movie;
}

function MovieCard( { movie } : Props) {
    const { reload, setReload } = useReload();
    const [editMovie, setEditMovie] = useState([])
    const [viewMovie, setViewMovie] = useState([])

    const handleEdit = (movie: any) => {
        console.log(movie)
        setEditMovie(movie)
        setModalShow(true)
 
     }
     const [modalShow, setModalShow] = useState(false);
     const [movieView, setMovieView] = useState(false);

     const handleClose = () => {
         setModalShow(false)
     }
     const handleViewChange = () => {
        setMovieView(false)
    }
 
     const handleDelete = (id: any) => {
        swal("The movie is going to be deleted")
        .then((value) => {
        axios.delete(`${BASE_URL}/movies/${id}`)
        .then((response:any) => {
            setReload(Reload.load)
            swal("Deleted movie successfully")
        })
        });

        
     }
     
     const handleView = (movie: any) => {
            //console.log("The movie details are....",movie)
            setViewMovie(movie)
            setMovieView(true)
     }

    return (
        <div className="movie-card" >
            <img className="movie-movie-card-image" src={movie.image} alt={movie.title} onClick={() =>handleView(movie)}  />
            <div className="movie-card-bottom-container" >
                <h5>{movie.title}</h5>
                <div className="movie-description">
                <p>{movie.description}</p>
                </div>
                
                <MovieScore duration={movie.duration} genre={movie.genre}  />
                   <div className="form-group">
                    <button type="submit" className="btn btn-primary"onClick={() => handleEdit(movie)} >Edit</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="submit" className="btn btn-secondary" onClick={() => handleDelete(movie._id)}>Delete</button>
                    </div>
            </div>
            <div>
                <Modal
                    size="lg"
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Movie
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddMovie onChange={handleClose} props={editMovie} />
                    </Modal.Body>
                </Modal>
            </div>
                <div>
                <Modal
                    size="lg"
                    show={movieView}
                    onHide={() => setMovieView(false)}
                    aria-labelledby="example-modal"
                >
                  <FormCard onChange={handleViewChange} props={viewMovie} />
                </Modal>
                </div>
        </div>
    );
}

export default MovieCard;