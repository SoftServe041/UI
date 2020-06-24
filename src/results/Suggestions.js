import React from 'react';
import Suggestion from './Suggestion';

function Suggestions(props) {
    const suggestionList = props.data.map((item) =>
        <Suggestion id={item.trackingId} price={item.price} deliveryDate={item.estimatedDeliveryDate} />
    );
    return (
        <ul>{suggestionList}</ul>
    );
}

export default Suggestions;