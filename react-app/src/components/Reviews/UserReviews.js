// import React, { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Redirect } from "react-router-dom"
// import { fetchGetUserReviews } from "../../store/review"
// import CurrentUserReview from "./CurrentUserReview"

// const UserReviews = () => {
//   const dispatch = useDispatch()
//   const sessionUser = useSelector((state)=>state.session.user)
//   const reviewsObj = useSelector((state) => state.reviews.user)
//   const reviewsArr = Object.values(reviewsObj)

//   useEffect(()=>{
//     dispatch(fetchGetUserReviews())
//   }, [dispatch, sessionUser,

//     reviewsArr.length])

//   if (!sessionUser) return <Redirect to="/" />

//   return (
//       <div className="my-reviews-outer">

//         <div className="my-reviews-inner">

//           {
//             reviewsArr.map((review) => (
//               <CurrentUserReview key={review.id} review={review} user={sessionUser}/>
//             ))
//           }
//         </div>
//       </div>

//   )
// }

// export default UserReviews
