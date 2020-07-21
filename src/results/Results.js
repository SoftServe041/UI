import React from 'react'
import { Row, Col } from 'react-bootstrap'
import history from '../history'
import SearchForm from './SearchForm'
import axios from 'axios'
import Result from './Result'
import '../App.css'
import './style-result.css'
import ModalError from "../error/modalErrorFF.js";


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
		this.state = {
			departure: 'Departure',
			arrival: 'Arrival',
			ifFormIncorrect: false,
			ifSameHubSelected: false,
			routes: routesArr,
			citiesList: [],
			listOfBoxes: [],
			ifShowModalError: false,
			errorMessage: ''
		}

		this.submitHandler = this.submitHandler.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSelectedDeparture = this.handleSelectedDeparture.bind(this)
		this.handleSelectedArrival = this.handleSelectedArrival.bind(this)
		this.ifError = this.ifError.bind(this)

		console.log(props);
	}

	ifError() {
		this.setState({ifShowModalError: false});
	}

	componentDidMount() {
		let convertToMeters = [];
		if (!(parseInt(history.location.listOfBoxes).length > 0 || history.location.listOfBoxes === undefined)) {
			(history.location.listOfBoxes.map((box) => {
				let temp = (box) = {
					weight: box.weight,
					width: box.width / 100,
					height: box.height / 100,
					length: box.length / 100,
				}
				convertToMeters.push(temp);
			}))
		}
		const dataFromMainPage = {
			sizeList: convertToMeters,
			departureHub: history.location.arrival,
			arrivalHub: history.location.departure,
		}
		this.getData(dataFromMainPage);
		this.loadCities();

		if (history.location.departure !== undefined) {
			this.setState({
				departure: history.location.departure,
				arrival: history.location.arrival,
				listOfBoxes: convertToMeters
			});
		}
	}

	async loadCities() {
		await axios.get(`http://localhost:9041/cities`)
			.then(res => {
				this.setState({ citiesList: res.data })
			});
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
			this.setState({ifShowModalError: true, errorMessage: error.message});
		});
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
				{(this.state.ifShowModalError) && <ModalError ifShow={this.state.ifShowModalError}
					message={this.state.errorMessage}
					ifError={this.ifError} />}
				<Row id='results'>
					<Col md={{ span: 8, offset: 2 }}>
						<SearchForm
							departure={this.state.departure}
							arrival={this.state.arrival}
							weight={this.state.weight}
							ifFormIncorrect={this.state.ifFormIncorrect}
							submitHandler={this.submitHandler}
							handleChange={this.handleChange}
							handleSelectedDeparture={this.handleSelectedDeparture}
							handleSelectedArrival={this.handleSelectedArrival}
							data={this.state}
							citiesList={this.state.citiesList}
							listOfBoxes={this.state.listOfBoxes}
						/>
					</Col>
				</Row>
				<Result routes={this.state.routes} data={this.props}/>
			</div>
		)
	}
}

export default Results
