import React from 'react'
import { Row, Col } from 'react-bootstrap'
import history from '../history'
import SearchForm from './SearchForm'
import axios from 'axios'
import Result from './Result'
import '../App.css'
import './style-result.css'

const routesArr = {
    "dateSorted": [
        {
            "trackingId": "ch42971",
            "price": 4090,
            "estimatedDeliveryDate": "2020-07-04"
        }
    ],
    "priceSorted": [
        {
            "trackingId": "ch42971",
            "price": 4090,
            "estimatedDeliveryDate": "2020-07-04"
        }
    ]
}

class Results extends React.Component {
	constructor(props) {
		super(props);
		console.log("history", history);
		this.state = {
			departure: 'Departure',
			arrival: 'Arrival',
			ifFormIncorrect: false,
			ifSameHubSelected: false,
			routes: routesArr,
			citiesList: [],
			listOfBoxes: []
		}

		this.submitHandler = this.submitHandler.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSelectedDeparture = this.handleSelectedDeparture.bind(this)
		this.handleSelectedArrival = this.handleSelectedArrival.bind(this)
	}

	componentDidMount() {
		const dataFromMainPage = {
			sizeList: history.location.listOfBoxes,
			departureHub: history.location.arrival,
			arrivalHub: history.location.departure,
		}
		console.log("dataFromMainPage", dataFromMainPage);
		this.getData(dataFromMainPage);
		this.loadCities();

		if (history.location.departure != undefined) {
			this.setState({
				departure: history.location.departure,
				arrival: history.location.arrival,
				listOfBoxes: history.location.listOfBoxes
			});
		}

	}

	async loadCities() {
		await axios.get(`http://localhost:9041/cities`)
			.then(res => {
				this.setState({ citiesList: res.data })
			})
			.catch(error => console.log('Cities cannot be loaded' + error));
	}

	async getData(dataToSend) {
		await axios(
			{
				method: 'POST',
				url: 'http://localhost:9041/requestRoutes',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				data: dataToSend
			}
		).then((response) => {
			this.setState({ routes: response.data });
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
			sizeList: this.state.listOfBoxes,
			departureHub: this.state.arrival,
			arrivalHub: this.state.departure
		};

		if (this.formValid(this.state)) {
			this.getData(dataToSend);
		} else {
			this.setState({ ifFormIncorrect: true })
			console.error('Invalid form')
		}
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

	formValid = ({ departure, arrival }) => {
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
							cargoWeight={this.state.cargoWeight}
							ifFormIncorrect={this.state.ifFormIncorrect}
							submitHandler={this.submitHandler}
							handleChange={this.handleChange}
							handleSelectedDeparture={
								this.handleSelectedDeparture
							}
							handleSelectedArrival={this.handleSelectedArrival}
							data={this.state}
							citiesList={this.state.citiesList}
							listOfBoxes={this.state.listOfBoxes}
						/>
					</Col>
				</Row>
				<Result routes={this.state.routes} />
			</div>
		)
	}
}

export default Results
