const GET_CART = 'cart/get_cart'
const ADD_CART = 'cart/add_cart'
const UPDATE_CART = 'cart/update_cart'
const DELETE_CART = 'cart/delete_cart'
const CHECKOUT_CART = 'cart/checkout_cart'

const getCart = cart => ({
    type: GET_CART,
    cart
})

const addCart = cart => ({
    type: ADD_CART,
    cart
})

const updateCart = (cart) => ({
    type: UPDATE_CART,
    cart
})

const deleteCart = id => ({
    type: DELETE_CART,
    id
})

const checkoutAction = () => ({
    type: CHECKOUT_CART
})

export const fetchGetCart = () => async (dispatch) => {
    const res = await fetch('/api/cart/account');
    if (res.ok) {
        const data = await res.json()
        console.log(data, "getcartDATA")
        dispatch(getCart(data))
        return data
    }
}

export const fetchAddCart = (productId, quantity) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "quantity": quantity })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addCart(data))
        return data
    } else {
        const data = await res.json()
        return data.errors
    }
}

export const fetchEditCart = (id, quantity) => async (dispatch) => {
    console.log(id, "ID EDIT???????")
    console.log(quantity, "QUANTITY EDIT????")
    const res = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "quantity": quantity })
    })
    if (res.ok) {
        const editCartItem = await res.json()
        dispatch(updateCart(editCartItem))
        return editCartItem
    } else {
        const data = await res.json()
        return data.errors
    }
}

export const fetchDeleteCart = id => async (dispatch) => {
    const res = await fetch(`/api/cart/${id}`, {
        method: 'DELETE'
    })
    if (res.ok){
        const data = await res.json()
        dispatch(deleteCart(data))
        return data
    } else {
        const data = await res.json()
        return data.errors
    }
}

export const fetchCheckoutCart = () => async (dispatch) => {
    const res = await fetch(`/api/cart/checkout`, {
        method: 'DELETE'
    })
    if(res.ok){
        const data = await res.json()
        dispatch(checkoutAction(data))
        return data
    } else {
        const data = await res.json()
        return data.errors
    }
}

const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CART:
            const newStateGet = {};
            // console.log(action.cart, "Hello???!?")
            action.cart.Carts.forEach(item => {
                newStateGet[item.id] = item
            })
            return newStateGet

        case ADD_CART:
            const newStateAdd = { ...state }
            newStateAdd[action.cart.id] = action.cart
            return newStateAdd

        case UPDATE_CART:
            const newState = { ...state }
            console.log(action.cart, "HELLLO?????")
            newState[action.cart.id] = action.cart
            return newState

        case DELETE_CART:
            const newStateDelete = { ...state }
            delete newStateDelete[action.id]
            return newStateDelete

        case CHECKOUT_CART:
            return {}

        default:
            return state
    }
}

export default cartReducer
