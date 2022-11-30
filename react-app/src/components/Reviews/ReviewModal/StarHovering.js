import React, { useState } from "react"
import { AiFillStar } from "react-icons/ai"
import '../reviews.css'

const StarHovering = ({ stars, setStars }) => {
  const [hover, setHover] = useState(null)

  return (
    <div className="stars-wrapper">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1

        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={()=>setStars(ratingValue)}
            />
            <AiFillStar
              className="star"
              color={ ratingValue <= (hover||stars) ? "#040505":"#e4e5e9"}
              size={20}
              onMouseEnter={()=>setHover(ratingValue)}
              onMouseLeave={()=>setHover(null)}
            />
          </label>
        )
      })}
    </div>
  )
}

export default StarHovering
