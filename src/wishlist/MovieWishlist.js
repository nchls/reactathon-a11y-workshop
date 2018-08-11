import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

import WishList from './WishList';
import getWishlistActions from './getWishlistActions';
import MovieEditor from './MovieEditor';


class MovieWishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditor: false,
            movieIdInEdit: null
        };

        this.handleShowEditor = this.handleShowEditor.bind(this);
        this.handleHideEditor = this.handleHideEditor.bind(this);
        this.handleUpdateMovie = this.handleUpdateMovie.bind(this);
    }

    handleShowEditor(movieId) {
        this.setState({
            showEditor: true,
            movieIdInEdit: movieId
        });
    }

    handleHideEditor() {
        this.setState({
            showEditor: false,
            movieIdInEdit: null
        });
    }

    handleUpdateMovie(updatedDetails) {
        const { updateMovie } = this.props;
        const { movieIdInEdit } = this.state;

        updateMovie(movieIdInEdit, updatedDetails);
        this.handleHideEditor();
    }

    render() {
        const {
            history,
            match,
            wishlist,
            setAsWatched,
            setAsUnwatched,
            removeMovie
        } = this.props;
        const { showEditor, movieIdInEdit } = this.state;

        const goToBrowse = () => history.push('/browse');
        const movieActions = getWishlistActions(this.handleShowEditor, setAsWatched, setAsUnwatched, removeMovie);
        const movieInEditing = movieIdInEdit ? wishlist[movieIdInEdit] : {};

        return (
            <div>
                <header className="navbar navbar-dark bg-primary">
                    <span className="navbar-text">
                        <h1>Movie Wishlist</h1>
                    </span>
                    <button className="btn btn-outline-secondary" onClick={goToBrowse}>Add</button>
                </header>

                <main>
                    <ul className="nav nav-pills nav-justified">
                        <li className="nav-item">
                            <NavLink to="/wishlist/unwatched" className="nav-link" activeClassName="active">Unwatched</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/wishlist/watched" className="nav-link" activeClassName="active">Watched</NavLink>
                        </li>
                    </ul>

                    {Object.keys(wishlist).length
                        ? <div>
                            <WishList
                                movieList={wishlist}
                                watched={match.params.status === 'watched'}
                                movieActions={movieActions}
                            />
                        </div>
                        : <p>No Movies in your Wish List! <Link to="/browse">Add some</Link>!</p>
                    }

                    { showEditor
                        ? <MovieEditor movie={movieInEditing} updateMovie={this.handleUpdateMovie} />
                        : null
                    }
                </main>
            </div>
        );
    }
}

MovieWishlist.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    wishlist: PropTypes.object.isRequired,
    updateMovie: PropTypes.func.isRequired,
    setAsWatched: PropTypes.func.isRequired,
    setAsUnwatched: PropTypes.func.isRequired,
    removeMovie: PropTypes.func.isRequired
};


export default MovieWishlist;