import {ReactComponent as GithubIcon} from 'assets/img/github.svg'; 

import './styles.css';
import React from 'react';

function Navbar(){
    
    return(
        <header>
        <nav className="container">
          <div className="movie-nav-content">
            <h1>Movies App</h1>
          </div>
        </nav>
      </header>
    );
}

export default Navbar;