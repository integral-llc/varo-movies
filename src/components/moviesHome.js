import React, {Component} from 'react';
import {values, size} from 'lodash';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

import {movies} from "../dataServices/restApi";
import MovieRow from "./movieRow";

export class MoviesHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      movies: [],
      currentPage: 1,
      totalPages: -1,
      error: null,
      favoriteMovies: {},
      viewFavoritesOnly: false
    }
  }

  componentDidMount() {
    this.setState({loading: true});

    this.loadMovies();
  }

  /**
   *
   * @param page {int}
   */
  loadMovies = (page = 1) => {
    movies(page)
      .then(result => {
        if (!result.ok) {
          this.setState({error: 'Could not fetch movies.'});
          return;
        }
        result.json()
          .then(json => {
            this.setState({
              loading: false,
              movies: json.results,
              totalPages: json.total_pages,
              currentPage: json.page
            })
          });
      })
  }

  onFavoriteClick = (movie) => {
    const {favoriteMovies} = this.state;
    if (favoriteMovies[movie.id]) {
      delete favoriteMovies[movie.id];
    } else {
      favoriteMovies[movie.id] = movie;
    }

    // might be good to save this in localCache and preserve between page reloads
    // but in real world this would be available only for logged in users, should be fine for now
    this.setState({favoriteMovies});
  }

  onShowOnlyFavoritesClick = () => {
    this.setState({viewFavoritesOnly: !this.state.viewFavoritesOnly});
  }

  render() {
    const {loading, error, movies, favoriteMovies, viewFavoritesOnly} = this.state;
    if (loading) {
      return this.renderLoading();
    }
    if (error) {
      return this.renderError(error);
    }

    const arMovies = viewFavoritesOnly && size(favoriteMovies) ? values(favoriteMovies) : movies;

    return [
      <div className='row' key='actions'>
        <div className="col-lg-12">
          <button className='btn btn-primary' onClick={this.onShowOnlyFavoritesClick}
            disabled={!size(favoriteMovies)}>Show only favorites</button>
        </div>
      </div>,
      this.renderNextPrevPages(),
      <div className='row' key='movieList'>
        <div className='col-lg-12'>
          <table className='table table-active'>
            <thead>
            <tr>
              <th/>
              <th>Title</th>
              <th>Release date</th>
            </tr>
            </thead>
            <tbody>
            {arMovies.map(movie => <MovieRow movie={movie} key={movie.id} favorite={this.state.favoriteMovies[movie.id]}
                                             onFavoriteClick={() => this.onFavoriteClick(movie)}/>)}
            </tbody>
          </table>
        </div>
      </div>
    ]
  }

  renderLoading = () => {
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <div className='alert alert-warning'>
            Loading...
          </div>
        </div>
      </div>
    )
  }

  renderError = (error) => {
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <div className='alert alert-danger'>
            {error}
          </div>
        </div>
      </div>
    )
  }

  renderNextPrevPages = () => {
    let {totalPages, currentPage, viewFavoritesOnly, favoriteMovies} = this.state;

    if (!totalPages || (viewFavoritesOnly && size(favoriteMovies)))
      return null;

    return (
      <div className="row" key='pagination'>
        <div className="col-lg-3 offset-9">
          <Pagination>
            <PaginationItem disabled={currentPage === 1} onClick={() => this.loadMovies(1)}>
              <PaginationLink>First</PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={currentPage === 1} onClick={() => this.loadMovies(currentPage - 1)}>
              <PaginationLink previous/>
            </PaginationItem>
            <PaginationItem disabled={currentPage === totalPages} onClick={() => this.loadMovies(currentPage + 1)}>
              <PaginationLink next/>
            </PaginationItem>
            <PaginationItem disabled={currentPage === totalPages} onClick={() => this.loadMovies(totalPages)}>
              <PaginationLink>Last</PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    )
  }
}