import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from './Api';

const statuses = {
  'watched': 'Assistido',
  'watching': 'Assistindo',
  'toWatch': 'Assistir'
};

class Series extends Component {
    
    constructor(props) {
      super(props);

      this.state = {
        isLoading: false,
        series: [],
        genre: null
      };

      this.renderSeries = this.renderSeries.bind(this);
      this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({ isLoading: true });
            api.loadSeriesByGenre(this.props.match.params.genre)
                .then((response) => {
                    this.setState({  
                        isLoading: false,
                        series: response.data,
                        genre: this.props.match.params.genre
                    });
                });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match.params.genre !== prevState.genre) {
            return {genre: nextProps.match.params.genre}
        } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.genre !== this.state.genre) {
            this.loadData();
        } else return null;
    }

    deleteSeries(id) {
        api.deleteSeries(id)
            .then(response => {
                this.loadData();
            });
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
                        {serie.genre} / {statuses[serie.status]}
                      </p>
                    </div>
                    <div className="col-xs-12 buttons-caption">
                      <Link to={`/series-edit/${serie.id}`} className="btn btn-success" >Editar</Link>
                      <a className="btn btn-danger" onClick={ ()=> this.deleteSeries(serie.id) }>Excluir</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );  
      }

    render() {
        return (
            <section id="intro" className="intro-section">
              <h1>Series { this.props.match.params.genre }</h1>
              {
                this.state.isLoading && 
                <p>Carregando, aguarde...</p>
              }
              <div class="container-fluid">
              {
                ! this.state.isLoading && this.state.series.length === 0 &&
                <div className='alert alert-info'>Nenhuma Série Para Ver</div>
              }

              <div id="series" className="row list-group">
                {
                  ! this.state.isLoading && 
                  this.state.series.map(this.renderSeries)
                }
              </div>
            </div>
            </section>
        );
    }
}

export default Series;