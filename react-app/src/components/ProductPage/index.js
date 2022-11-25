import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './ProductPage.css'
import { fetchSingleProduct } from '../../store/product';
import { AiFillStar } from "react-icons/ai"

const ProductPage = () => {
    const history = useHistory()
    const { productId } = useParams()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const currentProduct = useSelector(state => state.products.singleProduct)[0]
    const [chosenImg, setChosenImg] = useState(null)
    const [quantity, setQuantity] = useState(1)

    let currentUser;

    useEffect(async () => {
        dispatch(fetchSingleProduct(productId))
    }, [dispatch, productId])

    let seller = false
    if (sessionUser?.id === currentProduct?.sellerId) {
        seller = true
    }

    if (sessionUser && currentProduct) {
        if (sessionUser.id === currentProduct?.sellerId) {
            currentUser = false
        } else {
            currentUser = true
        }
    }
    const choices = []
    for (let i = 1; i <= currentProduct?.quantity; i++) {
        choices.push(i)
    }

    return (
        <div className='entire-product-container'>
            <div className='product-container'>
                <div className='left-product-container'>
                    <div className='img-container'>
                        <div className='small-img-container'>
                            {currentProduct?.productImages.length > 0 &&
                                currentProduct?.productImages.map((image, i) => {
                                    return (
                                        <img src={image} className='small-picture' key={i} onClick={() => { setChosenImg(image) }} alt='smallImg'></img>
                                    )
                                })}
                        </div>
                        <div className='big-img-container'>
                            {
                                currentProduct?.productImages.length > 0 &&
                                <img src={chosenImg ? chosenImg : currentProduct.productImages[0]} className="big-image" alt='bigImg'></img>
                            }
                        </div>
                    </div>
                </div>
                <div className="product-right-part">
            <div className="single-product-seller">{currentProduct?.seller}</div>
            <div className="single-product-sales">{currentProduct?.seller} sales  <span className="vertical-seperate">|</span>
            {/* <span className="product-detail-avgrating-star">
            {
              currentProduct?.avgRating &&
              Number(currentProduct?.avgRating) % 1 ?
              <span>
                {[...Array(Math.floor(currentProduct.avgRating))].map((star) => (<i className="fa-solid fa-star"></i>))}
                <i className="fa fa-star-half-o" aria-hidden="true"></i>
              </span>
              :
              <span>
                {[...Array(currentProduct?.avgRating)].map((star) => (<i className="fa-solid fa-star"></i>))}
              </span>
            }
            {
              !currentProduct.avgRating &&
              <span>
              {[...Array(5)].map((star) => (<AiFillStar className="prod-star" color="#e4e5e9" size={16.5}/>))}
              </span>
            }
            </span> */}
            </div>
            <div className="single-product-name">{currentProduct?.name}</div>

            <div className="single-product-price">${Number(currentProduct?.price).toFixed(2)}</div>

            <div className="single-product-quantity">quantity: {currentProduct?.quantity}</div>
            <div className="single-product-quantity">
                <select className="product-input-quantity" value={quantity} onChange={e => setQuantity(e.target.value)}>
                {choices.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                </select>
            </div>
            <div className="single-product-addtocart">

                {/* {currentUser ?
                              <button className="add-to-cart-button" type='button' variant='outlined'
                              disabled={currentProduct.quantity === 0}
                              onClick={addToCart}>
                              {getCartButtonMessage(currentProduct.quantity)}
                              </button>
                : <button className="not-login-addtocart-button">Please log in to purchase</button>
                } */}
        <div className="product-detail-gift">
            <i className="fa-solid fa-gift fa-2xl"></i>
            <div className="product-detail-text">
              <span className="ajw">A sought-after gift</span>
              {/* -over 20 people have this in their carts
              right now. */}
            </div>
          </div>
          <div className="product-detail-award">
            <i className="fa-solid fa-award fa-2xl"></i>
            <div className="product-detail-text">
              <span className="ajw">Star Seller.&nbsp;</span>This seller consistently earned 5-star reviews,
              shipped on time, and replied quickly to any messages they
              received.
            </div>
          </div>
          <div className="product-detail-truck">
          <i className="fa-solid fa-truck-fast fa-2xl"></i>
            <div className="product-detail-text">
              <span className="ajw">Hooray!&nbsp;</span>This item ships
              free to the US.
            </div>
          </div>

            </div>
                <div className="single-product-description">Description</div>
                <div className="single-product-description-content"> {currentProduct?.details}</div>
                <div className="single-product-shipping">Cost to ship</div>
          <div className="free-shipping">Free</div>
          <div className="free-shipping-message">
            Zesty offsets carbon emissions from shipping and packaging on this
            purchase.
          </div>
          <div className="return-exchange-div">
            <div>
              <div className="return-exchange-smalltext">
                Returns & exchanges
              </div>
              <div className="return-exchange-bigtext">Accepted</div>
              <div className="return-exchange-smalltext">
                Exceptions may apply
              </div>
            </div>
            <div>
              <div className="return-exchange-smalltext">
                Return & exchange window
              </div>
              <div className="return-exchange-bigtext">30 days</div>
              <div className="return-exchange-smalltext">
                from item delivery
              </div>
            </div>
          </div>
            </div>

            </div>

        </div>
    )
}

export default ProductPage
