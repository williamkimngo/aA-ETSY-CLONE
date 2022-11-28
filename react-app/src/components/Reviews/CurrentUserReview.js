import { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch} from "react-redux"
import { fetchGetUserReviews } from "../../store/review"
import { thunkDeleteReview } from "../../store/review"
import EditReviewForm from "./EditReviewForm"
import "./reviews.css"

const CurrentUserReview = ({review, user}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [showEditReview, setShowEditReview] = useState(false)

  const deleteReviewHandleClick = async () => {
    if (window.confirm("Are you sure you want to remove this review?")){
      await dispatch(thunkDeleteReview(review?.id))
    }
  }

  useEffect(()=>{
    dispatch(fetchGetUserReviews())
  }, [dispatch])


  if (!review) return null

  return (
    <div className="myreviews-review-container">
      <div div className="myreviews-image-container">
        <Link style={{ textDecoration: "none", color: "black" }} to={`/products/${review?.Product?.id}`}>
          <img src={review?.Product?.previewImage} />
        </Link>
        <div className="review-button-wrap">
          <span>
            <button
            className="review-button"
            // onClick={()=>history.push(`/products/${review?.Product.id}/edit-review`)}>
            onClick={()=>setShowEditReview(!showEditReview)}>
              Edit
            </button>
          </span>
          <span>
            <button
            className="review-button"
            onClick={deleteReviewHandleClick}>
              Delete
            </button>
          </span>
        </div>
      </div>

      <div className="my-single-info">
        <div className="my-single-header">
          Review For
          <div className="my-single-product-name">
            {review?.Product?.name.split(",")[0].split("|")[0]}
          </div>
        </div>
        <div className="my-single-stats">
          <div className="my-single-review-date">
              {new Date(review?.createdAt).toString().slice(3,-42)}
          </div>
          {!showEditReview &&
          <>
            <div className="my-single-rating">
                {
                  [...Array(review?.ratings)].map((star) => (<i className="fa-solid fa-star"></i>))
                }
            </div>
            <div className="my-single-review">
              {/* <i className="fa fa-quote-left fa-lg" aria-hidden="true"></i> */}
                {review?.review}
              {/* <i className="fa fa-quote-right fa-lg" aria-hidden="true"></i> */}
            </div>
          </>
          }
        </div>

        <div>
          {showEditReview &&
              <EditReviewForm
                myreview={review}
                showEditReview={showEditReview}
                setShowEditReview={setShowEditReview}
                />
          }
        </div>
      </div>
    </div>
  )
}

export default CurrentUserReview
