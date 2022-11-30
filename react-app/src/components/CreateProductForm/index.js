import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../store/product";
import './createProductForm.css'
import ImgCreate from "./imageForm";

const CreateProduct = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const categories = ['Lemon', 'Orange', 'Lime', 'Grapefruit']
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [details, setDetails] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [productId, setProductId] = useState()
    const [page, setPage] = useState(0)
    const [errors, setErrors] = useState([])

    if (!sessionUser) {
        history.push('/')
    }
    useEffect(() => {
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
      }, [name, category, price, details, quantity])

      const submitCreate = async (e) => {
        e.preventDefault()
        if (errors.length > 0) {
            return
        }
        const data = {name, category, details, price, quantity}
        const res = await dispatch(addProduct(data))
        if(res) {
            setProductId(res.id)
            setPage(1)

        }
      }
      return (
        <div className='createproduct-total'>
        {page === 0 &&
            <>
            <div className='createproduct-wrapper'>
                <h1 className="createproduct-form-title">Create Product</h1>
                <form className='createproduct-form' onSubmit={submitCreate}>
                    {/* <div className='createproduct-errors'>
                        <ul>
                            {errors && errors.map((err) => (
                                <li key={err}>{err}</li>
                            ))}
                        </ul>
                    </div> */}
                    <div className='createproduct-content'>
                        <label className='createproduct-label'>
                            <span className="createproduct-title">Name* </span>
                            <span className="createproduct-sub-title">Include keywords that buyers would use to search for your item.</span>
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Name')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <input className='createproduct-input'
                                type="text"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label className='createproduct-label'>
                            <span className="createproduct-title">Category* </span>
                            <span className="createproduct-sub-title">Select a category to help shoppers search your product.</span>
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
                                className='createproduct-input-select'
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
                        <label className='createproduct-label'>
                            <span className="createproduct-title">Price* </span>
                            <span className="createproduct-sub-title">Remember to factor in the cost of materials, labor, and other business expenses.</span>
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Price')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <input className='createproduct-input'
                                type="text"
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label className='createproduct-label'>
                            <span className="createproduct-title">quantity* </span>
                            <span className="createproduct-sub-title">Provide the quantity of your product.</span>
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Quantity')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <input className='createproduct-input'
                                type="text"
                                value={quantity}
                                required
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label className='createproduct-label'>
                            <span className="createproduct-title">details* </span>
                            <span className="createproduct-sub-title">Start with a brief overview that describes your item's finest features.</span>
                            <br></br>
                            {errors?.map((error, i) => {
                                if (error.split(":")[0] === 'Details')
                                    return (
                                        <div key={i} className='edit-product-errors'>•{error.split(":")[1]}</div>
                                    )
                            })}
                            <textarea className='createproduct-input-details'
                                type="text"
                                value={details}
                                required
                                onChange={(e) => setDetails(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <button className="createproduct-button" type="submit">create and next</button>

                    </div>
                </form>
            </div>
            </>
            }
            {page === 1 &&
                <div className='main-shop-outer'>
                <ImgCreate productId={productId} />
                </div>
            }
        </div>
    )
}

export default CreateProduct
