import '../App.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function NavBar(props) {
    return (
            <nav className="navbar sticky-top navbar-dark navbar-expand-lg bg-dark">
                <div className="container-fluid">
                <a className="navbar-brand" href="/">{props.name}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">{props.option1}</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/">{props.option2}</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/">{props.option3}</a>
                    </li>
                </ul>
                </div>
                </div>
            </nav>
    );
}

NavBar.defaultProps = {
    name : "XLSX2JSON",
    option1: "",
    option2 :"", 
    option3 :""
};

NavBar.propTypes = {
    name: PropTypes.string.isRequired
};