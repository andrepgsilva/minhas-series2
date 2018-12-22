import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Home from './Home';
import NewSeries from './NewSeries';
import Series from './Series';
import EditSeries from './EditSeries';
import api from './Api';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          genres: [],
          isLoading: false
      }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        api.loadGenres()
        .then((response) => {
            this.setState({
                isLoading: false,
                genres: response.data
            });
        });
    }

    renderGenreLink(genre) {
        return (
            <li key={genre}><Link to={`/series/${genre}`}>{genre}</Link></li>
        );
    }

    render() {
      return (
        <Router>
          <div className="App">
            <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
              <div className="container">
                <div className="navbar-header page-scroll">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-ex1-collapse" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a className="navbar-brand page-scroll" href="#page-top">
                    <img src="/images/logo.png" height="30" />
                  </a>
                </div>

                <div className="collapse navbar-collapse navbar-ex1-collapse" id="navbar-ex1-collapse">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    {/* Navbar Dropdown */}
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Gêneros <span className="caret"></span></a>
                      <ul className="dropdown-menu">
                      {
                        !this.state.isLoading &&
                          this.state.genres.map(this.renderGenreLink)
                      }
                      </ul>
                    </li>
                    <li>
                      <Link to="/new">Nova Série</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <Route exact path='/' component={Home} />
            <Route path='/series-edit/:id' component={EditSeries} />
            <Route exact path='/new' component={NewSeries} />
            <Route path='/series/:genre' component={Series} />
          </div>
        </Router>
      );
    }
}

export default App;
