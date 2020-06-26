import React, {useState} from 'react';
import Card from "./Card/Card";
import s from './BillingDetails.module.css'
import {Modal,FormControl} from "react-bootstrap";


const BillingDetails = (props) => {
    const data = props.data.data
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div>
                <p className={s.text}>
                    Please note that at least 1 card is required ??
                </p>
                <div className={s.container}>
                    <div>
                        <>
                            <button className={s.button} onClick={handleShow}>
                                Add new card
                            </button>

                            <Modal show={show} size="lg">
                                <Modal.Header>
                                    <Modal.Title>Creating new card</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <div className={s.modal_container}>
                                            <span className={s.before_input_text}>Name of card:</span>
                                            <FormControl className={s.input_style} type="text" placeholder="Enter name of credit card"/>
                                        </div>
                                        <div className={s.modal_container}>
                                            <span className={s.before_input_text}>Card number:</span>
                                            <FormControl className={s.input_style} type="text" placeholder="Enter numb of credit card"/>
                                        </div>
                                        <div className={s.modal_container}>
                                            <span className={s.before_input_text}>CSC:</span>
                                            <FormControl className={s.input_style} type="text" placeholder="Enter CSC of card"/>
                                        </div>
                                        <div className={s.modal_container}>
                                            <span className={s.before_input_text}>Expiration date:</span>
                                            <FormControl className={s.input_style} type="date" placeholder="Enter date of credit card"/>
                                        </div>
                                        <div className={s.modal_container}>
                                            <span className={s.before_input_text}>Billing address:</span>
                                            <FormControl className={s.input_style} type="text" placeholder="Enter billing address"/>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className={s.button} onClick={handleClose}>
                                        Close
                                    </button>
                                    <button className={s.button} onClick={handleClose}>
                                        Create
                                    </button>
                                </Modal.Footer>
                            </Modal>
                        </>
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