import React from 'react';
import { Container } from 'react-bootstrap';
import SearchForm from './SearchForm';

class Results extends React.Component {
    constructor(props) {
        super(props);
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
            citiesList: [] //to be used instead of cities import json
        }
    }

    componentDidMount() {
        this.setState({
            departure: this.props.departure,
            arrival: this.props.arrival,
            weight: this.props.weight,
            height: this.props.height,
            width: this.props.width,
            length: this.props.length,
            routes: this.props.routes,
            citiesList: this.props.citiesList
        });
    }

    render() {
        return (
            <div>
                <SearchForm departure={this.state.departure}
                            arrival={this.state.arrival}
                            weight={this.state.weight}
                            height={this.state.height}
                            width={this.state.width}
                            length={this.state.length}
                            isFormIncorrect={this.state.ifFormIncorrect}

                            />
                <Container>
                    <Result />
                </Container>
            </div>
        );
    }
}

export default Results;