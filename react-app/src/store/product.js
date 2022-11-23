const GET_PRODUCTS = 'products/getproducts'
const GET_ONE_PRODUCT = 'products/getoneproduct'
const CREATE_PRODUCT = 'products/createproduct'
const EDIT_PRODUCT = 'products/editproduct'
const DELETE_PRODUCT = 'products/deleteproduct'

//actions
const getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    }
}

const getOneProduct = (product) => {
    return {
        type: GET_ONE_PRODUCT,
        product
    }
}

const createProduct = (product) => {
    return {
        type: CREATE_PRODUCT,
        product
    }
}

const editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        product
    }
}

const deleteProduct = (productId) => {
    return {
        type: DELETE_PRODUCT,
        productId
    }
}


// Thunks
export const fetchAllProducts = () => async (dispatch) => {
    const response = await fetch('/api/products');

    if (response.ok) {
        const data = await response.json();
        dispatch(getProducts(data))
        return data
    }
}

export const fetchSingleProduct = () => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getOneProduct(data))
        return data
    }
}

export const addProduct = (product) => async (dispatch) => {
    const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(createProduct(data))
        return data
    }
}

export const editSingleProduct = (product, productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(editProduct(data))
        return data
    }
}

export const deleteSingleProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE"
    })

    if(response){
        dispatch(deleteProduct(productId))
    }
}


//reducer
const initialState = { allProducts: {}, singleProduct: {}}


const productReducer = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case GET_PRODUCTS:
            newState = {...state, allProducts: {...state.allProducts}}
            action.products.Products.forEach(product => {
                newState.allProducts[product.id] = product
            })
            newState.singleProduct={}
            return newState;
        case GET_ONE_PRODUCT:
            newState = { ...state, singleProduct: { ...action.product } };
            return newState;
        case addProduct:
            newState = { ...state, allProducts: { ...state.allProducts, [action.product.id]: action.product}};
            return newState
        case EDIT_PRODUCT:
            newState = { ...state, allProducts:{ ...state.allProducts, [action.product.id]: action.product}};
            return newState
        case DELETE_PRODUCT:
            newState = {...state}
            newState.allProducts = {...state.allProducts}
            newState.singleProduct = {...state.singleProduct}
            delete newState.allProducts[action.productId]
            if (newState.singleProduct.id === action.productId) newState.singleProduct = {}
            return newState
        default:
            return state
    }
}

export default productReducer
