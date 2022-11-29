import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetCart } from "../../store/cart";
import CheckOutCart from "./CheckoutCart";
import CartItem from "./CartLeft";
import { NavLink } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch()
    const [cartLoaded, setCartLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    const ObjCartItems = useSelector(state => state.cart)
    const cartItemsArr = Object.values(ObjCartItems)
    console.log(cartItemsArr, "CARTITEMSARRRAY!!!!")
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        if (cartItemsArr) {
            let initalTotalPrice = 0
            for (let cartItem of cartItemsArr) {

                initalTotalPrice += parseFloat(cartItem?.quantity) * parseFloat(cartItem?.Product?.price)
                // console.log(totalPrice, "TOTALPRICE?????")
                setTotalPrice(initalTotalPrice)
            }
        }
    }, [cartItemsArr])


    useEffect(() => {
        (async () => {
            if (sessionUser) {
                await dispatch(fetchGetCart())
                setCartLoaded(true)
            }
        })()
    }, [dispatch, cartItemsArr.length])
    if (!sessionUser) {
        return (
            <div className="login-cart">
                Please log in to checkout your cart
            </div>
        )
    }

    return cartLoaded && (
        <div className="cart-container">
            {cartItemsArr?.length > 0 && <div className="cart-leftpart">
                {cartItemsArr?.length > 0 && <h2 className="items-count-in-cart">{cartItemsArr?.length} item(s) in your cart</h2>}
                {cartItemsArr?.length > 0 && cartItemsArr?.map((item, i) =>
                     <CartItem key={i} item={item} />
                )}
            </div>}
            {cartItemsArr?.length > 0 &&
                <CheckOutCart
                    cartItems={cartItemsArr}
                    totalPrice={totalPrice}
                />
            }
            {!cartItemsArr?.length &&
                <div className="cart-empty-message">
                    <h1 className="cart-is-empty">Your cart is empty.</h1>
                    <NavLink style={{
                        color: 'black'
                    }} to='/'>Discover something unique to fill it up</NavLink>
                </div>
            }
        </div>
    )
}

export default Cart
