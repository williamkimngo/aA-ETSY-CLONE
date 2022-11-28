const GET_CART = 'cart/get_cart'
const ADD_CART = 'cart/add_cart'
const UPDATE_CART = 'cart/update_cart'
const DELETE_CART = 'cart/delete_cart'

const getCartItems = cart => ({
    type: GET_CART,
    cart
})

const addCartItem = cart => ({
    type: ADD_CART,
    cart
})

const updateCartItem = (id, quantity) => ({
    type: UPDATE_CART,
    id,
    quantity
})

const deleteCartItem = id => ({
    type: DELETE_CART,
    id
})


