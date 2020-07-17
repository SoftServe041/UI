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


/*const routesArr = {const routesArr = {
    "dateSorted": [
        {
            "trackingId": "ch42971",
            "price": 4090,
            "estimatedDeliveryDate": "2020-07-04",
            "departureHub": "Kyiv",
            "arrivalHub": "Kharkov",
            "cargos": [
                {
                    "weight": "20",
                    "width": "1",
                    "height": "1",
                    "length": "3",
                },
				{
					"weight": "18",
					"width": "40",
					"height": "2",
					"length": "8",
				},
            ],
            "route":{
                "hubs":[
                    "Kyiv",
                    "Lviv",
                    "Odesa"
                ]
            }
        }
    ],
    "priceSorted": [
        {
            "trackingId": "ch42971",
            "price": 4090,
            "estimatedDeliveryDate": "2020-07-04",
            "departureHub": "Kyiv",
            "arrivalHub": "Kharkov",
            "cargos": [
                {
                    "weight": "20",
                    "width": "1",
                    "height": "1",
                    "length": "3",
                },
                {
                    "weight": "18",
                    "width": "40",
                    "height": "2",
                    "length": "8",
                },
            ],
            "route":{
                "hubs":[
                        "Kyiv",
                        "Lviv",
                        "Odesa",
                ]
            }
        }
    ]
}

*/
class Results extends React.Component {
    constructor(props) {
        super(props);
        console.log(history, props)
        this.state = {
            departure: 'Departure',
            arrival: 'Arrival',
            ifFormIncorrect: false,
            ifSameHubSelected: false,
            routes: routesArr,
            listOfBoxes: [],
            citiesList: []
        }

        this.submitHandler = this.submitHandler.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectedDeparture = this.handleSelectedDeparture.bind(this)
        this.handleSelectedArrival = this.handleSelectedArrival.bind(this)
    }

    componentDidMount() {

        let convertToMeters = [];
        if (!(parseInt(history.location.listOfBoxes).length > 0 || history.location.listOfBoxes === undefined)) {
            (history.location.listOfBoxes.map((box) => {
                let temp = (box) = {
                    weight: parseFloat(box.weight),
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

        if (history.location.departure != undefined) {
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
            console.log("checking routes", response.data)
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
                            weight={this.state.weight}
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
                <Result
                    departure={this.state.departure}
                    arrival={this.state.arrival}
                    routes={this.state.routes}
                    data={this.props.data}
                    citiesList={this.state.citiesList}
                    listOfBoxes={this.state.listOfBoxes}
                />
            </div>
        )
    }
}

export default Results
