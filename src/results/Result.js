import React from 'react'
import {Tabs, Tab, Container, Row, Col} from 'react-bootstrap'
import Suggestions from './Suggestions'

class Result extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sortedByPrice: [],
			sortedByDeliveryDate: [],
			selectedTab: 'price',
		}
	}

	componentDidMount() {
		const unsorted = this.props.routes.slice()
		const sortDataByPrice = unsorted.sort((a, b) => a.price - b.price)
		const sortDataByDeliveryDate = this.props.routes.sort(
			(a, b) =>
				new Date(a.estimatedDeliveryDate) -
				new Date(b.estimatedDeliveryDate)
		)
		this.setState({
			sortedByPrice: sortDataByPrice,
			sortedByDeliveryDate: sortDataByDeliveryDate,
		})
		console.log('state', this.state)
	}

	handleSelectedTab(key) {
		this.setState({selectedTab: key})
		console.log('selectedTab', this.state.selectedTab)
	}

	render() {
		return (
			<Container style={{backgroundColor: '#c2c2c2'}}>
				<Row>
					<Col>
						<Tabs
							className='nav-fill'
							activeKey={this.state.selectedTab}
							onSelect={(key) => {
								this.handleSelectedTab(key)
							}}
						>
							<Tab
								className='nav-item'
								eventKey='price'
								title='Sort By Price:'
							>
								<Suggestions data={this.state.sortedByPrice} />
							</Tab>
							<Tab
								className='nav-item'
								eventKey='deliveryDate'
								title='Sort By Delivery Date:'
							>
								<Suggestions
									data={this.state.sortedByDeliveryDate}
								/>
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Result
