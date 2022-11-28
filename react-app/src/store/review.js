
const GET_REVIEWS = '/reviews/getReviews'
const GET_USER_REVIEW = 'reviews/getUserReview'
const CREATE_REVIEW = 'reviews/createReview'
const EDIT_REVIEW = 'reviews/editReview'
const DELETE_REVIEW = 'reviews/deleteReview'

const getReviewsAction = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

const getUserReviewAction = (reviews) => {
    return {
        type: GET_USER_REVIEW,
        reviews
    }
}

const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const editReviewAction = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const fetchGetProductReviews = (ProductId) => async (dispatch) => {
    console.log("PORDUCTID", ProductId)
    const response = await fetch(`/api/products/${ProductId}/reviews`)
    console.log(response, "RESPONSE????")
    if (response.ok) {
        const data = await response.json()
        console.log(data, "DATA????")
        const reviewsArray = data.Reviews
        console.log(reviewsArray, "REVARRAY??")
        dispatch(getReviewsAction(reviewsArray))
        return data
    }
}

export const fetchGetUserReviews = () => async (dispatch) => {
    const res = await fetch("/api/reviews/account")
    if (res.ok) {
        const data = await res.json()
        const reviewsArray = data.Reviews
        dispatch(getUserReviewAction(reviewsArray))
        return data
    }
}

export const thunkCreateReview = (newreview, productId, user) => async (dispatch) => {
    console.log(newreview, "NEWREIVEW?????")
    const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newreview)
    })
    console.log(res, "POSTRESS???")
    if (res.ok) {
        const data = await res.json()
        console.log(data, "POSTDATA??????")
        dispatch(createReviewAction(data))
        return data

    } else {
        const err = await res.json()
        return err
    }
}

export const thunkEditReview = (myreview, reviewId) => async (dispatch) => {
    // console.log(myreview, "MYREVIEW?????")
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myreview),
    })
    // console.log(res, "EDITRESE?????")
    if (res.ok) {
        const data = await res.json()
        // console.log(data, "EDITDATA???")
        dispatch(editReviewAction(data))
        return data
    }
}

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteReviewAction(reviewId))
    }
}

const initialState = {
    product: {},
    user: {}
}

const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state}
    switch (action.type) {
        case GET_REVIEWS:
            // newState = { ...state }
            const normalizedReviews = {}
            console.log("ACTION!!", action)
            action?.reviews?.forEach((review) => normalizedReviews[review.id] = review)
            newState.product = normalizedReviews
            newState.user = {}
            return newState
        case GET_USER_REVIEW:
            // newState = { ...state }
            const normalizedUserReviews = {}
            action.reviews.forEach((review) => normalizedUserReviews[review.id] = review)
            newState.user = normalizedUserReviews
            return newState
        case CREATE_REVIEW:
            // newState = { ...state }
            newState.product = { ...state.product }
            newState.user = { ...state.user }
            newState.product[action.review.id] = action.review
            newState.user[action.review.id] = action.review
            return newState
        case EDIT_REVIEW:
            // newState = { ...state }
            newState.product = { ...state.product }
            newState.user = { ...state.user }
            newState.product[action.review.id] = action.review
            newState.user[action.review.id] = action.review
            return newState
        case DELETE_REVIEW:
            // newState = { ...state }
            newState.product = { ...state.product }
            newState.user = { ...state.user }
            delete newState.product[action.reviewId]
            delete newState.user[action.reviewId]
            return newState
        default:
            return state
    }
}

export default reviewsReducer
