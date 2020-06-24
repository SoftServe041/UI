import React from 'react';
import Card from "./Card/Card";
import s from './BillingDetails.module.css'

const BillingDetails = (props) => {
    const data = props.data.data
    return (
        <div>
            <div>
                <p className={s.text}>
                    Please note that at least 1 card is required ??
                </p>
                <div className={s.container}>
                    <div>
                        <button className={s.button}>Add new card</button>
                    </div>
                </div>
            </div>
            <div>
                {
                    data.map((card,index) => {
                        return <Card data={card} key={index}/>
                    })
                }
            </div>
        </div>
    )
}
export default BillingDetails;