import React, {useEffect, useState} from 'react';
import Card from "./Card/Card";
import s from './BillingDetails.module.css'
import {Modal, FormControl, Form, Col} from "react-bootstrap";
import modal500 from "../../error/modal500";
import axios from 'axios'

const cscRegEx = /\b\d{3}\b/;
const cardRegEx = /\b\d{16}\b/;


const url = "localhost:8041";

const propss = {
    data: [
        {
            'id': 1,
            'cardNumber': '1234567898765432',
            'cardName': 'Ivan Ivanov',
            'expirationMonth': '05',
            'expirationYear': '22',
            'billingAddress': 'Pushkina dom kolotushkina'
        },
        {
            'id': 2,
            'cardNumber': '1234567898765432',
            'cardName': 'kum',
            'expirationMonth': '15',
            'expirationYear': '23',
            'billingAddress': 'Pushkina dom ssdssds'
        },
        {
            'id': 3,
            'cardNumber': '1234567898765432',
            'cardName': 'kudsdsdm',
            'expirationMonth': '15',
            'expirationYear': '23',
            'billingAddress': 'Pushkina dom ssdssds'
        }
    ]
}

const BillingDetails = (props) => {

    const data = propss.data
    const userId = props.data.userId
    const token = props.data.token


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [cardNumber, setCardNumber] = useState('')
    let [cardName, setCarName] = useState('')
    let [csc, setCsc] = useState('')
    let [expirationMonth, setExpirationMonth] = useState('')
    let [expirationYear, setExpirationYear] = useState('')
    let [billingAddress, setBillingAddress] = useState('')

    let [cards, setCards] = useState({})

    let [errorCardNumber, setErrorCardNumber] = useState('')
    let [errorCardName, setErrorCardName] = useState('')
    let [errorCsc, setErrorCsc] = useState('')
    let [errorExpirationMonth, setErrorExpirationMonth] = useState('')
    let [errorExpirationYear, setErrorExpirationYear] = useState('')
    let [errorBillingAddress, setErrorBillingAddress] = useState('')
    let flag = true;

    useEffect(() => {
        if (flag) {
            getCards()
        }
        flag = false;

        console.log("userEffect")
    });


    const getCards = () => {
        // axios({
        //     'method': 'GET',
        //     'url': `http://${url}/user/${userId}/billing-details/`,
        //     'headers': {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer_${token}`
        //     },
        // }).then(response => {
        //     initialization(response.data);
        // }).catch(error => {
        //     console.log('error while getting cards from server: ', error);
        // });
        // console.log("axios get")



    }

    const initialization = (data) => {


        setCards(data)

    }


    const formValid = (errors, data) => {
        let valid = true;

        Object.values(errors).forEach(value => {
            if (value.length > 0) {
                valid = false;
            }
        })
        Object.values(data).forEach(value => {
            if (!value.length > 0) {
                valid = false;
                setErrorBillingAddress("Invalid fields")
            }
        })

        return valid;
    }


    const refreshCardData = () => {
        setCarName('')
        setCardNumber('')
        setCsc('')
        setErrorBillingAddress('')
        setCarName('')
        setErrorCardName('')
        setErrorCardNumber('')
        setErrorCsc('')
        setErrorExpirationMonth('')
        setErrorExpirationYear('')
        setErrorBillingAddress('')
    }

    const sendCard = () => {
        // axios.post(`http://${url}/user/${userId}/billing-details`, {
        //     cardNumber: cardNumber,
        //     nameOnCard: cardName,
        //     csc: csc,
        //     expirationMonth: expirationMonth,
        //     expirationYear: expirationYear,
        //     billingAddress: billingAddress
        // }).then(response => {
        //     console.log('response: ', response);
        //     initialization(response.data)
        // })
        //     .catch(error => {
        //         this.accessModError(error.toString())
        //     });

        console.log("axios post");
    }

    const deleteCard = (id) =>
    {
        // axios({
        //     'method': 'DELETE',
        //     'url': `http://${url}/user/${userId}/billing-details/`,
        //     'data':{id:id},
        //     'headers': {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer_${token}`
        //
        //     },
        // }).then(response => {
        //     initialization(response.data);
        // }).catch(error => {
        //     console.log('Error deleting card : ', error);
        // });

        console.log(`remove ${id}`)
    }


    const createCardAndAddToData = () => {
        sendCard()
        refreshCardData();
    }

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        let error;
        switch (name) {
            case "cardNumber":
                setCardNumber(value);
                error = cardRegEx.test(value)
                    ? ''
                    : "Not valid card number"
                setErrorCardNumber(error);
                break;
            case "cardName":
                setCarName(value);
                error = value.length > 3
                    ? ''
                    : "Not valid card name"
                setErrorCardName(error)
                break;
            case "csc":
                setCsc(value);
                error = cscRegEx.test(value)
                    ? ''
                    : "Not valid csc"
                setErrorCsc(error)
                break;
            case "expirationDate":
                setExpirationMonth(value.slice(5, 7))
                setExpirationYear(value.slice(2, value.length - 6))
                break;
            case "billingAddress":
                setBillingAddress(value);
                error = value.length > 6
                    ? ''
                    : "Not valid billing address"
                setErrorBillingAddress(error)
                break;
        }
    }


    const handleSubmit = () => {
        if (formValid({
                errorCardName,
                errorCardNumber,
                errorCsc,
                errorBillingAddress,
                errorExpirationMonth,
                errorExpirationYear,
            },
            {
                cardName,
                cardNumber,
                csc,
                billingAddress,
                expirationMonth,
                expirationYear
            })) {
            createCardAndAddToData();
            handleClose()

        } else {

        }


    }


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
                            <Form onSubmit={handleSubmit} onChange={handleChange}>
                                <Modal show={show} size="lg"
                                       aria-labelledby="contained-modal-title-vcenter"
                                       centered>
                                    <Modal.Header>
                                        <Modal.Title>Creating new card</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                            <div className={s.modal_container}>
                                                <span className={s.before_input_text}>Name of card:</span>
                                                <Form.Control
                                                    name="cardName"
                                                    className={s.input_style} type="text"
                                                    placeholder="Enter name of credit card"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {errorCardName.length > 0 && (
                                                <div>
                                                    <div className={s.errorMessages}>{errorCardName}</div>
                                                </div>
                                            )}
                                            <div className={s.modal_container}>
                                                <span className={s.before_input_text}>Card number:</span>
                                                <Form.Control
                                                    name="cardNumber"
                                                    className={s.input_style} type="text"
                                                    placeholder="Enter numb of credit card"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                {errorCardNumber.length > 0 && (
                                                    <div className={s.errorMessages}>{errorCardNumber}</div>
                                                )}
                                            </div>
                                            <div className={s.modal_container}>
                                                <span className={s.before_input_text}>CSC:</span>
                                                <Form.Control
                                                    name="csc"
                                                    className={s.input_style} type="text"
                                                    placeholder="Enter CSC of card"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                {errorCsc.length > 0 && (
                                                    <div className={s.errorMessages}>{errorCsc}</div>
                                                )}
                                            </div>
                                            <div className={s.modal_container}>
                                                <span className={s.before_input_text}>Expiration date:</span>
                                                <Form.Control
                                                    name="expirationDate"
                                                    className={s.input_style} type="date"
                                                    placeholder="Enter date of credit card"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className={s.modal_container}>
                                                <span className={s.before_input_text}>Billing address:</span>
                                                <Form.Control
                                                    name="billingAddress"
                                                    className={s.input_style} type="text"
                                                    placeholder="Enter billing address"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                {errorBillingAddress.length > 0 && (
                                                    <div className={s.errorMessages}>{errorBillingAddress}</div>
                                                )}
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button className={s.button} onClick={handleClose}>
                                            Close
                                        </button>
                                        <button className={s.button} onClick={handleSubmit}>
                                            Create
                                        </button>
                                    </Modal.Footer>
                                </Modal>
                            </Form>
                        </>
                    </div>
                </div>
            </div>
            <div>
                {
                    data.map((card, index) => {
                        return <Card data={card} key={index} userId={userId} del={deleteCard}/>
                    })
                }
            </div>
        </div>
    )
}
export default BillingDetails;