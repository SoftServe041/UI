import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import history from '../history'
import SearchForm from './SearchForm'
import axios from 'axios'
import Result from './Result'
import '../App.css'
import './style-result.css'

const routesArr = [
	{trackingId: 1, price: 1234, estimatedDeliveryDate: '2020-07-01T03:24:00'},
	{trackingId: 2, price: 1456, estimatedDeliveryDate: '2020-07-02T03:24:00'},
	{trackingId: 3, price: 1244, estimatedDeliveryDate: '2020-07-03T03:24:00'},
	{trackingId: 4, price: 934, estimatedDeliveryDate: '2020-07-04T03:24:00'},
	{trackingId: 5, price: 1234, estimatedDeliveryDate: '2020-07-05T03:24:00'},
	{trackingId: 6, price: 2234, estimatedDeliveryDate: '2020-07-06T03:24:00'},
	{trackingId: 7, price: 3334, estimatedDeliveryDate: '2020-07-07T03:24:00'},
]

class Results extends React.Component {
	constructor(props) {
		super(props)
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
		console.log("history in Results", history.location);
		console.log("props in Results", this.props);
	}

	  componentDidMount() {
        //  console.log("Results history", history)
        // this.setState({
        //     departure: this.props.departure,
        //     arrival: this.props.arrival,
        //     weight: this.props.weight,
        //     height: this.props.height,
        //     width: this.props.width,
        //     length: this.props.length,
        //     routes: this.props.routes,
        //     citiesList: this.props.citiesList
        // });
    }


	submitHandler = (e) => {
		const url = 'http://localhost:8080/' // this url need to be changed
		e.preventDefault()
		this.setState({ifFormIncorrect: false, ifSameHubSelected: false})

		if (this.formValid(this.state)) {
			console.log(this.state)
			axios
				.post(url, this.state) //this.state - need to be changed to specified json object
				.then((response) => {
					console.log(response)
					this.setState({routs: response.data})
				})
				.catch((error) => {
					console.log(error)
					if (error.status === 404) {
						window.location = '/error'
					}
				})
		} else {
			this.setState({ifFormIncorrect: true})
			console.error('Invalid form')
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
		e.preventDefault()
		this.setState({ifFormIncorrect: false})
	}

	handleSelectedDeparture(e) {
		this.setState({departure: e})
	}

	handleSelectedArrival(e) {
		this.setState({arrival: e})
	}

	formValid = ({departure, arrival}) => {
		let valid = true

		if (departure === arrival) {
			this.setState({ifSameHubSelected: true})
			console.log(
				'ifSameHubSelected: true ',
				this.state.ifSameHubSelected
			)
			valid = false
		} else {
			this.setState({ifSameHubSelected: false})
			console.log(
				'ifSameHubSelected: false ',
				this.state.ifSameHubSelected
			)
			valid = true
		}

		if (departure === 'Departure' || arrival === 'Arrival') {
			valid = false
		}

		return valid
	}

	render() {
		console.log(this.state.departure, this.state.arrival)
		return (
			<div>
				<Row id='results'>
					<Col md={{span: 8, offset: 2}}>
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
						/>
					</Col>
				</Row>

				<Result routes={routesArr} />
				{/* <Result routes={this.state.routes} /> */}
			</div>
		)
	}
}

export default Results
