import React from 'react';
import s from './Card.module.css'


function Card(props){

    let dan = props.data

    function getNumb(val,index)
    {
        return (val.substr(index,4) + " ");
    }

    function splitCardNumber(card_numbers)
    {
        let str = "";
        for (let i = 0 ;i <= card_numbers.length;i+=4)
        {
            str += getNumb(card_numbers,i);
        }
        return str;
    }
    return (
        <div>
            <div className={s.container}>
                <div className={s.item}>
                    <p>
                        {dan.nameOfCard}
                    </p>
                </div>

                <div className={s.item}>
                    <p className={s.type_text_numbers}>
                        {splitCardNumber(dan.cardNumber)}
                    </p>
                </div>

                <div>
                    <div className={s.item}>
                        <p className={s.type_text_numbers}>
                            {dan.expirationMonth}/{dan.expirationYear}
                        </p>
                        <button className={s.button} type="submit">
                            Delete Card
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Card;