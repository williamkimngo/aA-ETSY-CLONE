import React, { useState } from "react"
import { useDispatch} from "react-redux"
import { useHistory} from "react-router-dom"
import { thunkEditReview } from "../../store/review"
import StarHovering from "./ReviewModal/StarHovering"
import "./reviews.css"

const EditReviewForm = ({myreview, showEditReview, setShowEditReview}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [editReview, setEditReview] = useState(myreview.review)
  const [editStars, setEditStars] = useState(myreview.ratings)
  const [rating, setStars] = useState(myreview.ratings)
  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const reviewId = myreview?.id


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setHasSubmitted(true)

    const errorsArr = []
    if (rating <= 0) errorsArr.push("please enter a star rating between 1 and 5")

    if (editReview.length > 1000) errorsArr.push("please enter a valid review fewer than 1000 characters long")

    if (!editReview) errorsArr.push("Please complete your review.")
    setErrors(errorsArr)

    if (errorsArr.length) return

    setShowEditReview(false)

    const reviewInfo = { "review": editReview, "rating": rating }
    const editedReview = await dispatch(thunkEditReview(reviewInfo, reviewId))
      .then(()=>history.push(`/account`))
      .catch(async (res) => {
        const message = await res.json()
        const messageErrors = []
        if (message) {
          messageErrors.push(message.message)
          setErrors(messageErrors)
        }
      })
    if (editedReview) history.push(`/account`)
    reset()
  }

  const reset = () => {
    setEditReview("")
    setStars(5)
    setErrors([])
    setHasSubmitted(false)
  }

  return (
    <div className="edit-review-form">
      <div className="validation-errors">
        {
        hasSubmitted &&
        errors &&
        errors.map((error)=>(<div key={error}>{error}</div>))
        }
      </div>

      <form onSubmit={handleSubmit}>
      <div className="form-input-wrapper">

            <label className="review-field">
              {/* Rating:&nbsp; */}
              {/* <select
                type="number"
                value={editStars}
                onChange={(e) => setEditStars(e.target.value)}
              >
                {[1,2,3,4,5].map((num)=>(<option key={num}>{num}</option>))}
              </select> */}
              <StarHovering stars={rating} setStars={setStars}/>
            </label>
            <div className="form-input-break"></div>
            <label className="review-field">

              <textarea
                type="text"
                placeholder="Optional"
                value={editReview}
                onChange={(e) => setEditReview(e.target.value)}
              />
            </label>
        </div>

        <button
        // disabled={
        //   hasSubmitted &&
        //   errors.length > 0 ? true : false
        // }
        className="modal-submit-button"
        onClick={handleSubmit}
        >
          Update Review
        </button>

      </form>
    </div>
  )
}

export default EditReviewForm
