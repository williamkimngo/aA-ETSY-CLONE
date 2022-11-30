import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editSingleProduct } from "../../store/product";
import { fetchUserProducts } from "../../store/product";
import './ProductEditForm.css'

const ProductEditForm = ({productId, setShowEditForm }) => {
    const dispatch = useDispatch()
    const userProduct = useSelector(state => state.products.allProducts[productId])
    const categories = ['Lemon', 'Orange', 'Lime', 'Grapefruit']
    const [name, setName] = useState(userProduct?.name)
    const [category, setCategory] = useState('')
    const [details, setDetails] = useState(userProduct?.details)
    const [price, setPrice] = useState(userProduct?.price)
    const [quantity, setQuantity] = useState(userProduct?.quantity)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(fetchUserProducts())
        const errors = []
        if (name.length < 5) {
            errors.push('Name: Product name requires at least 5 characters')
        }
        if (name.length > 250) {errors.push('Name: Product name exceeds 250 character limit')}
        if (category.length === 0) {errors.push("Category: Product Category's selection is required")}
        if (details.length < 10) {errors.push('Details: Product Details requires at least 10 characters')}
        if (details.length > 2000) {errors.push('Details: Product Details exceeds 2000 character limit')}
        if (isNaN(price)) {errors.push('Price: Price must be a number')}
        if (price <= 1) {errors.push('Price: Price must be greater than $1.00')}
        if (price > 1000) {errors.push('Price: Price exceeds $1,000 limit')}
        if (!Number.isInteger(+quantity)|| quantity < 1) {errors.push('Quantity: Quantity must be greater than 0')}
        if (quantity > 100) {errors.push('Quantity: Quantity must be less than 100')}

        setErrors(errors)
      }, [dispatch, name, category, price, details, quantity])

      const editHandle = async(e) => {
        e.preventDefault()
        if(errors.length > 0) {
            return
        }
        const data = {name, category, details, price, quantity}
        const res = await dispatch(editSingleProduct(data, productId))
        if (res){
            setShowEditForm(false)
        }
      }
      return (
        <div className='editproduct-wrapper'>
            <div className='editproduct-form-title'>Edit Product</div>
            <form className='editproduct-form' onSubmit={editHandle}>
                <div className='editproduct-content'>
                        <label className='editproduct-label'>
                            <span className="editproduct-title">Name* </span>
                            <span className="editproduct-sub-title">Update the keywords used to search for your item.</span>
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Name')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <input className='editproduct-input'
                                type="text"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label className='editproduct-label'>
                            <span className="editproduct-title">Category* </span>
                            <span className="editproduct-sub-title">Change the category your product is listed under.</span>
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Category')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <select
                                htmlFor='category'
                                name='category'
                                className='editproduct-input-select'
                                required
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            <option disabled selected value={category}>-- Select a Category --</option>
                                {categories.map((category) => {
                                    return (
                                        <option
                                            value={category}
                                        >{category}</option>)
                                })}
                    </select>
                        </label>
                        <br></br>
                        <label className='editproduct-label'>
                            <span className="editproduct-title">Price* </span>
                            <span className="editproduct-sub-title">Update the price of your product.</span>
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Price')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <input className='editproduct-input'
                                type="text"
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label className='editproduct-label'>
                            <span className="editproduct-title">Quantity* </span>
                            <span className="editproduct-sub-title">Update the Quantity of your product.</span>
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Quantity')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <input className='editproduct-input'
                                type="text"
                                value={quantity}
                                required
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label className='editproduct-label'>
                            <span className="editproduct-title">details* </span>
                            <span className="editproduct-sub-title">Modify the details of your product.</span>
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Details')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <textarea className='editproduct-input-details'
                                type="text"
                                value={details}
                                required
                                onChange={(e) => setDetails(e.target.value)}
                            />
                        </label>
                        <br></br>
                    <button className="editproduct-button" type="submit">Edit</button>
                </div>
            </form>
        </div>
    )
}

export default ProductEditForm
