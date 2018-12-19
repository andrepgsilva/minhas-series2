import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from './Api';

const statuses = {
  'watched': 'Assistido',
  'watching': 'Assistindo',
  'toWatch': 'Assistir'
};

class NewSeries extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			genres: [],
			isLoading: false,
			redirect: false
		}

		this.saveSeries = this.saveSeries.bind(this);
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

	saveSeries() {
		const newSeries = {
			name: this.refs.name.value,
			status: this.refs.status.value,
			genre: this.refs.genre.value,
			comments: this.refs.comments.value,
			image: this.refs.image.value
		};
		api.saveSeries(newSeries)
			.then(response => {
				this.setState({ 
				  redirect: '/series/' + this.refs.genre.value
				});
			});
	}

	render() {
		return (
				<div className="container">
					<section className="intro-section">
						{
							this.state.redirect &&
							<Redirect to={this.state.redirect} />
						}
						<h1>Nova Série</h1>
						<div class="col-md-3"></div>
						<form className="col-md-6">
							Nome: <input type="text" ref="name" className="form-control" />
							Status:
							<select className="form-control" ref="status">
								{
									Object.keys(statuses).map( key => {
										return <option key={key} value={ key }>{ statuses[key] }</option>
									})
								}
							</select>
							Gênero:
							<select className="form-control" ref="genre">
								{
									this.state.genres.map( key => {
										return <option key={key} value={ key }>{ key }</option>
									})
								}
							</select>
							Comentários: <textarea ref="comments" className="form-control" />
							Imagem da Série: <input type="text" ref="image" className="form-control" placeholder="Insert a image link"/>
							<button type="button" onClick={this.saveSeries} className="btn btn-primary">Salvar</button>
						</form>
						<div class="col-md-3"></div>
					</section>
				</div>
		);
	}
}

export default NewSeries;