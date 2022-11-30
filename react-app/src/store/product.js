const GET_PRODUCTS = 'products/getproducts'
const GET_ONE_PRODUCT = 'products/getoneproduct'
const CREATE_PRODUCT = 'products/createproduct'
const EDIT_PRODUCT = 'products/editproduct'
const DELETE_PRODUCT = 'products/deleteproduct'
const ADD_IMG = 'products/addimg'
const ALL_USER_PRODUCTS = 'products/userproducts'
const PRODUCT_SEARCH = 'products/productsearch'

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

const addImg = (img) => {
    return {
        type: ADD_IMG,
        img
    }
}

const userProducts = (products) => {
    return {
        type: ALL_USER_PRODUCTS,
        products
    }
}

const productSearch = (products) => {
    return {
        type: PRODUCT_SEARCH,
        products
    }
}

// Thunks
export const fetchAllProducts = () => async (dispatch) => {
    const res = await fetch('/api/products');

    if (res.ok) {
        const data = await res.json();
        dispatch(getProducts(data))
        return data
    }
}

export const fetchSingleProduct = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getOneProduct(data))
        return data
    }
}

export const addProduct = (product) => async (dispatch) => {
    const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(createProduct(data))
        return data
    }
}

export const editSingleProduct = (product, productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(editProduct(data))
        return data
    }
}

export const deleteSingleProduct = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE"
    })

    if(res){
        dispatch(deleteProduct(productId))
    }
}

export const fetchImg = (url, productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/images`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({url: url})
    })

    if (res.ok){
        const data = await res.json();
        dispatch(addImg(data))
        return data
    }
}

export const fetchUserProducts = () => async (dispatch) => {
    const res = await fetch('/api/products/account')
    console.log(res, "RES?????")
    if (res.ok) {
        const data = await res.json()
        console.log(data, "USERPRODUCSTDATA!!!!!")
        dispatch(userProducts(data))
        return data
    }
}

export const searchProducts = (keyword) => async (dispatch) => {
    const res = await fetch(`/api/products/search/${keyword}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(productSearch(data))
        return data
    }
}
//reducer
const initialState = { allProducts: {}, singleProduct: {}, searchProducts: {}}


const productReducer = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case GET_PRODUCTS:
            newState = {...state, allProducts: {...state.allProducts}}
            action.products.Products.forEach(product => {
                newState.allProducts[product.id] = product;
            })
            newState.singleProduct={}
            return newState
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
        case ADD_IMG:
            newState = { ...state, singleProduct: { ...state.singleProduct, productImages:[action.imgData]}}
            return newState
        case ALL_USER_PRODUCTS:
            newState = {...state}
            const userProducts = {}
            console.log(action.products, "USERPRODUCTS??????")
            action.products.Products.forEach(product => userProducts[product.id] = product)
            newState.allProducts = userProducts
            return newState
        case PRODUCT_SEARCH:
            newState = {...state, searchProducts: {}}
            action.products.Products.forEach(product => {
                newState.searchProducts[product.id] = product
            })
            return newState
        default:
            return state
    }
}

export default productReducer
