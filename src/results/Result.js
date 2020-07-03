import React from 'react'
import {Tabs, Tab, Container, Row, Col} from 'react-bootstrap'
import Suggestions from './Suggestions'

class Result extends React.Component {
	constructor(props) {
		super(props);
		console.log("props", this.props);
		this.state = {
			selectedTab: 'price'
		}
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
								<Suggestions data={this.props.routes.priceSorted} />
							</Tab>
							<Tab
								className='nav-item'
								eventKey='deliveryDate'
								title='Sort By Delivery Date:'
							>
								<Suggestions
									data={this.props.routes.dateSorted}
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
