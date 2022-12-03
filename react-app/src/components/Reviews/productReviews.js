import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetProductReviews } from "../../store/review"
import { thunkEditReview } from "../../store/review"
import { thunkDeleteReview } from "../../store/review"

const ProductReviews = ({productId, user}) => {
    const dispatch  = useDispatch()
    const objProductReviews = useSelector(state => state.reviews.product)
    const productReviewsArr = Object.values(objProductReviews)
    const [editReview, setEditReview] = useState(false)
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchGetProductReviews(productId))
    }, [dispatch, productId])

    return (
        <>
        {productReviewsArr && productReviewsArr?.map(review => (
            <div className="single-review">


            <div className="single-review-stars">
              {
                [...Array(review?.ratings)].map((star) => (<i className="fa-solid fa-star"></i>))
              }
            </div>

            <p className="single-review-review">
              <span>
                {review?.review}
              </span>
            </p>
            <div className="single-review-section">
            <div className="single-review-name" >{review.User.first_name}</div>
            <div className="my-single-review-date">
              {new Date(review?.createdAt).toString().slice(3,-42)}
              <div className="product-delete-review">
              {review?.userId === sessionUser?.id ?
              // {console.log(review.userId, sessionUser.id, "USER????????")}
              <button className="delete-review-button" onClick={async () => {await dispatch(thunkDeleteReview(review.id)); await dispatch(fetchGetProductReviews(productId))}} > Delete Review </button>:null}
            </div>
            </div>
            </div>

            {
              review?.userId==user?.id &&
              <div className="product-review-button-wrap">

              </div>
              }
          </div>
        ))}
        </>
    )
}

export default ProductReviews
