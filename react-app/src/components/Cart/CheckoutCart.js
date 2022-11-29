import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { fetchCheckoutCart } from '../../store/cart';

const CheckOutCart = ({ cartItemsArr, totalPrice }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(totalPrice, "CHECKOUTTOTALPRICE????")
    const subtotal = Number(totalPrice).toFixed(2);
    console.log(subtotal, "SUBTOTAL????")
    const tax = Number((subtotal * 0.0825)).toFixed(2)
    const total = (Number(subtotal) + Number(tax)).toFixed(2)

    const deleteCart = async e => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to checkout?')){
        await dispatch(fetchCheckoutCart())}
        return history.push('/cart');
    };

    return (
        <div className="cart-checkout-card">
            <div className="checkout-card items-total">
                <span>Item(s) total: </span>
                <span>${subtotal}</span>
            </div>
            <div className="checkout-card sales-tax">
                <span>Sales Tax:</span>
                <span>${tax}</span>
            </div>
            <div className="checkout-card shipping-cost">
                <span>Shipping:</span>
                <span style={{
                    color: 'red'
                }}>$5.00</span>
            </div>
            <div className="checkout-card items-total last-total">
                <span style={{
                    display: 'inline'
                }}>Total:</span>
                <span>${total}</span>
            </div>
            <div className="buy-item-button-container">
                <button className="cart-checkout-button" onClick={deleteCart}>Proceed with purchase</button>
            </div>
        </div>
    );
}


export default CheckOutCart
