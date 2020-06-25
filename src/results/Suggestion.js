import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Suggestion(props) {
	return (
		<li key={props.id.toString()} className='suggestion-card'>
			<div>
				<p>Price: {props.price}</p>
				<p>
					Delivery Date:{' '}
					{new Date(props.deliveryDate).toLocaleDateString()}
				</p>
			</div>
			<div>
				<Link to='/registration' className='btn btn-dark'>
					Pay Now
				</Link>
			</div>
		</li>
	)
}

export default Suggestion
