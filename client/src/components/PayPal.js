import React, {
    useEffect,
    useRef
} from 'react'
import PropTypes from "prop-types";

PayPal.propTypes = {
    totalPrice: PropTypes.number
}
PayPal.defaultProps = {
    totalPrice: 0
}


export default function PayPal(props) {

    const {totalPrice} = props
    const [error, setError] = React.useState(null);

    const paypal = useRef();
    
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            description: "Cool Looking Table",
                            amount: {
                                currency_code: "CAD",
                                value: totalPrice
                            }
                        }],

                    })
                },
                onApprove: async (data, actions) => {
                    console.log('hello123123')
                    const order = await actions.order.capture();
                    console.log('Successful Order' + order)
                    alert('Transaction Successfully');
                },
                onError: (err) => {
                    console.log(err)
                }
            }).render(paypal.current)
    }, [])
    console.log(window.paypal)
    return ( 
        <div >
        <div ref = {paypal} /> 
        </div>
    )
}