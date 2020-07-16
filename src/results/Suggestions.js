import React from 'react';
import Suggestion from './Suggestion';
import axios from "axios";


const url = "localhost:9041"

function Suggestions(props) {
    function sendAxios(trackingId, deliveryDate, price, hubs, departureHub, arrivalHub, boxes) {
        console.log("number")
        console.log(props.userDetails.userId)
        console.log("number")
        console.log(props.userDetails.token)
        let data = {
            "price": price,
            "estimatedDeliveryDate": deliveryDate,
            "departureHub": departureHub,
            "arrivalHub": arrivalHub,
            "trackingId": trackingId,
        }
        let cargos = boxes;
        let route = {
            hubs
        }
        console.log(route)
        console.log(hubs)
        // axios.post(`http://${url}/user/${props.userDetails.userId}`, {
        //         cardNumber: cardNumber,
        //         nameOnCard: nameOnCard,
        //         csc: csc,
        //         expirationMonth: expirationMonth,
        //         expirationYear: expirationYear,
        //         billingAddress: billingAddress
        //     },
        //
        //     {
        //         'headers': {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer_${props.userDetails.token}`
        //         }
        //     }).then(response => {
        //     setFlag(true)
        // }).catch((error) => {
        //     setIfShowModalError(true);
        //     setErrorMessage(error.message);
        // });


        console.log("axiosss")
        console.log(data)
        console.log(hubs)
        console.log(props.userDetails)
        console.log(trackingId)
        console.log(deliveryDate)
        console.log(price)
        // console.log(cardId)
    }

    const suggestionList = props.data.map((item) =>
        <Suggestion
            key={item.trackingId}
            id={item.trackingId}
            price={item.price}
            boxes={props.boxes}
            hubs={props.cities}
            deliveryDate={item.estimatedDeliveryDate}
            departure={item.departureHub}
            arrivalHub={item.arrivalHub}
            send={sendAxios}
            dataOfUser={props.userDetails}
        />
    );
    return (
        <ul className='list-reset'>{suggestionList}</ul>
    );
}

export default Suggestions;