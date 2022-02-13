import axios from "axios";
import {useState, useEffect} from  "react";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";
import { BASE_URL } from "utils/requests";
import { MoviePage } from "types/movie";
import React from "react";
import Modal from 'react-bootstrap/Modal'
import AddMovie from '../../components/AddMovie/index'
import { useReload, Reload } from '../../context/movieContext';

function Listing() {

    const [modalShow, setModalShow] = useState(false);
    const { reload, setReload } = useReload();
    const handleClose = () => {
        setModalShow(false)
    }

    const [page, setPage] = useState<MoviePage>({
        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 12,
        number: 0,
        first: true,
        numberOfElements: 0,
        empty: true
    });

    const [movies,setMovies] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/movies`)
        .then((response :any) => {
            const data : any = response.data.data;
            setMovies(data);
        });
        setReload(Reload.reload)
    }, [reload == 'true']);


    return (
        <>
             <br/>
             <div className="d-flex flex-row-reverse bd-highlight">
                &nbsp;&nbsp;&nbsp;			
                <button type="button" className="btn btn-danger btn-md" onClick={() => setModalShow(true)}>
                    Add new movie
                </button>
            </div>
            <br/>
            <div></div>
            <div className="container">
                <div className="row">
                    {movies.map((movie : any) => (
                    <div key={movie._id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard movie={movie}/>
                    </div>
                    )
                )}
                </div>
                <div>
                <Modal
                    size="lg"
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    centered
                >
                    <Modal.Header style={{textAlign:'center'}}>
                    <Modal.Title id="example-modal-sizes-title-lg"  >
                        Add New Movie
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddMovie onChange={handleClose} />
                    </Modal.Body>
                </Modal>
                </div>
            </div>
        </>
    );
}

export default Listing;