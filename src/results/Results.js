import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import history from '../history'
import SearchForm from './SearchForm'
import axios from 'axios'
import Result from './Result'
import '../App.css'
import './style-result.css'

const routesArr = [
	{ trackingId: 1, price: 1234, estimatedDeliveryDate: '2020-07-01T03:24:00' },
	{ trackingId: 2, price: 1456, estimatedDeliveryDate: '2020-07-02T03:24:00' },
	{ trackingId: 3, price: 1244, estimatedDeliveryDate: '2020-07-03T03:24:00' },
	{ trackingId: 4, price: 934, estimatedDeliveryDate: '2020-07-04T03:24:00' },
	{ trackingId: 5, price: 1234, estimatedDeliveryDate: '2020-07-05T03:24:00' },
	{ trackingId: 6, price: 2234, estimatedDeliveryDate: '2020-07-06T03:24:00' },
	{ trackingId: 7, price: 3334, estimatedDeliveryDate: '2020-07-07T03:24:00' }
]

class Results extends React.Component {
	constructor(props) {
		super(props);
		console.log("props", this.props);
		this.state = {
			departure: 'Departure',
			arrival: 'Arrival',
			weight: '',
			height: '',
			width: '',
			length: '',
			ifFormIncorrect: false,
			ifSameHubSelected: false,
			routes: [],
			citiesList: [], //to be used instead of cities import json
		}

		this.submitHandler = this.submitHandler.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSelectedDeparture = this.handleSelectedDeparture.bind(this)
		this.handleSelectedArrival = this.handleSelectedArrival.bind(this)
	}

	componentDidMount() {
		console.log("Results history", history);
		const dataFromMainPage = {
			weight: history.location.weight,
			length: history.location.length / 100,
			width: history.location.width / 100,
			height: history.location.height / 100,
			from: history.location.arrival,
			to: history.location.departure
		}
		this.getData(dataFromMainPage);
		this.loadCities();

		if (history.location.departure != undefined) {
			this.setState({
				departure: history.location.departure,
				arrival: history.location.arrival,
				weight: history.location.weight,
				height: history.location.height,
				width: history.location.width,
				length: history.location.length,
			});
		}

	}

	async loadCities() {
		await axios.get(`http://localhost:9041/location`)
			.then(res => {

				console.log("componentDidMount", res.data)
				this.setState({ citiesList: res.data })
			})
			.catch(error => console.log('Cities cannot be loaded' + error));
	}

	async getData(dataToSend) {
		await axios(
			{
				method: 'POST',
				url: 'http://localhost:9041/', // this url need to be changed
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
				data: dataToSend
			}
		).then((response) => {
			console.log(response);
			this.setState({ routs: response.data });
		}).catch((error) => {
			console.log(error);
			if (error.status === 404) {
				window.location = '/error';
			}
		})
	}
	

	submitHandler = (e) => {
		e.preventDefault();
		this.setState({ ifFormIncorrect: false, ifSameHubSelected: false });
		let dataToSend = {
			weight: this.state.weight,
			length: this.state.length / 100,
			width: this.state.width / 100,
			height: this.state.height / 100,
			from: this.state.arrival,
			to: this.state.departure
		};
		console.log('data to send', dataToSend);
		// Uncomment this code when will get possibility to check this functionality

		// if (this.formValid(this.state)) {
		// 	this.getData(dataToSend);
		// } else {
		// 	this.setState({ ifFormIncorrect: true })
		// 	console.error('Invalid form')
		// }
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
		e.preventDefault()
		this.setState({ ifFormIncorrect: false })
	}

	handleSelectedDeparture(e) {
		this.setState({ departure: e })
	}

	handleSelectedArrival(e) {
		this.setState({ arrival: e })
	}

	formValid = ({ departure, arrival, weight, length, width, height }) => {
		let valid = true

		if (departure === arrival) {
			this.setState({ ifSameHubSelected: true })
			valid = false
		} else {
			this.setState({ ifSameHubSelected: false })
			valid = true
		}

		if (departure === 'Departure' || arrival === 'Arrival') {
			valid = false
		}

		if (weight.length < 1) { return false }
		if (height.length < 1) { return false }
		if (length.length < 1) { return false }
		if (width.length < 1) { return false }

		return valid
	}

	render() {
		return (
			<div>
				<Row id='results'>
					<Col md={{ span: 8, offset: 2 }}>
						<SearchForm
							departure={this.state.departure}
							arrival={this.state.arrival}
							weight={this.state.weight}
							height={this.state.height}
							width={this.state.width}
							length={this.state.length}
							ifFormIncorrect={this.state.ifFormIncorrect}
							submitHandler={this.submitHandler}
							handleChange={this.handleChange}
							handleSelectedDeparture={
								this.handleSelectedDeparture
							}
							handleSelectedArrival={this.handleSelectedArrival}
							data={this.state}
							citiesList={this.state.citiesList}
						/>
					</Col>
				</Row>

				<Result routes={routesArr} />
			</div>
		)
	}
}

export default Results
