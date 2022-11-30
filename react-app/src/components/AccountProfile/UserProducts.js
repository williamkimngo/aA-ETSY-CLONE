import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteSingleProduct } from "../../store/product"
import { useState } from "react"
import { Modal } from "../../context/Modal"
import './accountProfile.css'
import User from "../User"
import { AiFillStar } from "react-icons/ai"

const UserProducts = ({product}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    let seller = false
    if(sessionUser?.id === product.sellerId) {
        seller = true
    }
    const deleteProduct = async () => {
        if (window.confirm("Are you sure you want to delete this Product?")) {
            await dispatch(deleteSingleProduct(product.id))
        }
    }

    return (
        <div className="myproducts-product-container">


          <div className="myproducts-product-image-container">
            <Link style={{ textDecoration: "none", color: "black" }} to={`/products/${product.id}`}>
                (<img src={product.previewImage} />)
            </Link>

          </div>

          <div className="myproducts-product-info">
            <div>
              <div className="myproducts-product-category">
                {product.category}
              </div>
              <div className="myproducts-product-name">
                {/* {product.name} */}
                {product.name.split(",")[0].split("|")[0]}
              </div>
              <div className="myproducts-product-rating">
                {/* {product.avgRating ?
                  (<span>★ {product.avgRating.toFixed(1)}</span>):
                  (<span>★ no review</span>)
                } */}
                {
                  !Number(product.avgRating) &&
                  <span>
                  {[...Array(5)].map((star) => (<AiFillStar className="prod-star" color="#e4e5e9" size={18}/>))}
                  </span>
                }
                {
                  Number(product.avgRating) > 0 &&
                  ( Number(product.avgRating) % 1 ?
                  <span>
                    {[...Array(Math.floor(product.avgRating))].map((star) => (<i className="fa-solid fa-star"></i>))}
                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  </span>
                  :
                  <span>
                    {[...Array(product.avgRating)].map((star) => (<i className="fa-solid fa-star"></i>))}
                  </span> )
                }
              </div>
            </div>

            <div>
              <div className="myproducts-product-price">
                ${parseFloat(product.price).toFixed(2)}
              </div>
              <div className="myproducts-product-stock">
                {product.stock} left in stock
              </div>
            </div>

          </div>

          <div className="myproduct-buttons-container">
            {/* {seller && (
              <> */}
              {/* <Link to={`/edit-product/${product.id}`}>
                <button className="myproduct-buttons">
                  Edit
                </button>
              </Link> */}
              {/* <button className="myproduct-buttons" onClick={() => editProductHandleClick(product?.id)}> Edit </button>
              <div>
                {showEditForm && (
                  <Modal onClose={() => setShowEditForm(false)}>
                    <EditProduct productId={productId} setShowEditForm={setShowEditForm} />
                  </Modal>
                )}
              </div> */}
              <button
              className="myproduct-buttons"
              onClick={deleteProduct}>
                Delete
              </button>
              {/* </>
            )} */}
          </div>
        </div>
      )
}

export default UserProducts
