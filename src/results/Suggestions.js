import React from 'react';
import Suggestion from './Suggestion';
import axios from "axios";


const url = "localhost:9041"

function Suggestions(props) {
    function sendAxios(trackingId, deliveryDate, price, hubs, departureHub, arrivalHub, boxes) {
        let cargos = boxes;
        let route = {
            hubs
        }
        let data = {
            "price": price,
            "estimatedDeliveryDate": deliveryDate,
            "departureHub": departureHub,
            "arrivalHub": arrivalHub,
            "trackingId": trackingId,
            "cargos": cargos,
            "route": route
        }
        console.log("Hi")
        console.log(data)
        console.log("Hi")
        axios.post(`http://${url}/user/${props.userDetails.userId}`, {
                price: data.price,
                estimatedDeliveryDate: data.estimatedDeliveryDate,
                departureHub: data.departureHub,
                arrivalHub: data.arrivalHub,
                trackingId: data.trackingId,
                cargos: data.cargos,
                route: route
            },
            {
                'headers':
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer_${props.userDetails.token}`
                    }
            }).then(response => {
            console.log("Ok")
        }).catch((error) => {
            console.log(error);
            if (error.status === 404) {
                window.location = '/error';
            }
        });
    }

    const suggestionList = props.data.map((item) =>
        <Suggestion
            key={item.trackingId}
            id={item.trackingId}
            price={item.price}
            boxes={props.boxes}
            hubs={props.cities}
            deliveryDate={item.estimatedDeliveryDate}
            departureHub={item.departureHub}
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