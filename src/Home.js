import React, { Component } from 'react';
import api from './Api';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
      super(props);

      this.state = {
        series: null,
        isLoaded: false
      }
    }

    loadWatchedSeries() {
      api.loadWatchedSeries()
      .then(response => {
          this.setState({series: response.data, isLoaded: true});
      });
    }

    componentDidMount() {
        this.loadWatchedSeries();
    }


    renderSeries(serie) {
      return (
          <div key={serie.id} className="item serie-item col-md-6 col-xs-12 col-lg-4">
            <div>
              <Link to={`/series-edit/${serie.id}`}>
                <img className="group list-group-image serie-image" src={serie.image} alt="" />
              </Link>
              <div className="caption">
                <h4 className="group inner list-group-item-heading">
                  {serie.name}
                </h4>
                <div className="row">
                  <div className="col-xs-12 col-md-12">
                    <p className="serie-status">
                      {serie.genre}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );  
    }

    render() {
        return(
            <div>
              <section id="intro" className="intro-section">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <h1 className="main-image"><img src="images/logo.png" /></h1>
                    </div>
                  </div>
                </div>
                <div className="container watched-series">
                  <h2> Séries Assistidas </h2>
                  {
                    ! this.state.isLoaded &&
                    <p>Carregando, aguarde...</p>
                  }
                  {
                      this.state.isLoaded && 
                      this.state.series.map(this.renderSeries)
                  }
                </div>
              </section>
            </div >
        );
    }
}

export default Home;