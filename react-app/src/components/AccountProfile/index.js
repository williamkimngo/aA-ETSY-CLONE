import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import { fetchUserProducts } from "../../store/product"
import './accountProfile.css'
import UserProducts from "./UserProducts"
// import UserReviews from "../Reviews/UserReviews"
import CurrentUserReview from "../Reviews/CurrentUserReview"
import { fetchGetUserReviews } from "../../store/review"
import { resetProductsState } from "../../store/product"

const AccountProfile = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const ObjProducts = useSelector(state => state.products.allProducts)
    const productsArr = Object.values(ObjProducts)
    const reviewsObj = useSelector((state) => state.reviews.user)
    const reviewsArr = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(resetProductsState())
        dispatch(fetchUserProducts())
        dispatch(fetchGetUserReviews())
    }, [dispatch, sessionUser, reviewsArr.length])

    if (!sessionUser) {
        return <Redirect to="/" />
    }
    if (!productsArr.length) {
        return null
    }
    return (
        <div className="userproducts-container">
            <div className="userproducts-upper">
                <div className="userproducts-header"><h2>Welcome to your account page, {sessionUser?.username}!</h2>
                <div className="account-page-listproduct">

                    <NavLink exact to='/create-product' activeClassName="active">List your product</NavLink></div>
                    </div>
                {/* {sessionUser?.username &&
                    <div className="userproducts-products">
                        <span className="shop-manager-shop-name">{sessionUser?.username}</span>
                    </div>
                } */}
            </div>

            <div className="userproducts-outer">
                <h2>Your Products</h2>
                <div className="userproducts-inner">

                    {productsArr.map((product) => (
                        <UserProducts key={product.id} product={product} />
                    ))
                    }
                </div>
                <div className="userproducts-review-bottom">
                    <div className="my-reviews-main">
                        <div className="my-reviews-outer">
                        <h2>Your Reviews</h2>
                            <div className="my-reviews-inner">
                                {
                                    reviewsArr.map((review) => (
                                        <CurrentUserReview key={review.id} review={review} user={sessionUser} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default AccountProfile
