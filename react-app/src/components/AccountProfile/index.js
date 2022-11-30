import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchUserProducts } from "../../store/product"
import './accountProfile.css'
import UserProducts from "./UserProducts"
// import UserReviews from "../Reviews/UserReviews"
import CurrentUserReview from "../Reviews/CurrentUserReview"
import { fetchGetUserReviews } from "../../store/review"

const AccountProfile = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const ObjProducts = useSelector(state => state.products.allProducts)
    const productsArr = Object.values(ObjProducts)
    const reviewsObj = useSelector((state) => state.reviews.user)
    const reviewsArr = Object.values(reviewsObj)

    useEffect(() => {
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
                <div className="userproducts-header">Account Page</div>
                {sessionUser?.username &&
                    <div className="userproducts-products">
                        <span className="shop-manager-shop-name">{sessionUser?.username}</span>
                    </div>
                }
            </div>

            <div className="userproducts-outer">
                <div className="userproducts-inner">
                    {productsArr.map((product) => (
                        <UserProducts key={product.id} product={product} />
                    ))
                    }
                </div>
                <div className="userproducts-review-bottom">
                    <div className="my-reviews-main">
                        <div className="my-reviews-outer">
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
