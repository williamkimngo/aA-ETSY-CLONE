import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { searchProducts } from '../../store/product';
import './ProductSearch.css'

const SearchProducts = () => {
    const dispatch = useDispatch()
    const { keyword } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const ObjSearchProducts = useSelector(state => state.products.searchProducts)
    const searchProductsArr = Object.values(ObjSearchProducts)

    useEffect(() => {
        dispatch(searchProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div className='search-product-container'>
            <div className='search-header-container'>
                <div className='search-header'>
                    {searchProductsArr?.length > 0 ?
                        <><div className='search-sum'> {searchProductsArr?.length} search result for "{keyword}</div><span className='search-sum'>"</span></>
                        :
                        <><div className='search-sum'> We couldn't find any item for "{keyword}</div><span className='search-sum'>" &nbsp;</span><div className='search-again-message'>Try searching for something else instead?</div></>
                    }
                </div>
            </div>
            <div className='search-main'>
                <div className='search-products-main'>
                    {searchProductsArr?.map((product, i) => {
                        return (
                            <div className='search-product-body'>
                                <NavLink to={`/products/${product?.id}`} style={{ textDecoration: 'none' }} key={i}>
                                    <div className='search-product-img-container'>
                                        <img src={product?.previewImage} className='search-product-img' alt='images'></img>
                                    </div>
                                    <div className='search-product-name'>{product.name}</div>
                                    {product?.numReviews > 0 && <>
                                        <div className='search-product-stars'>
                                            <span className='search-product-num-reviews'>
                                                {
                                                    Number(product.avgRating) % 1 ?
                                                        <span>
                                                            {[...Array(Math.floor(product.avgRating))].map((star) => (<i className="fa-solid fa-star"></i>))}
                                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                        </span>
                                                        :
                                                        <span>
                                                            {[...Array(product.avgRating)].map((star) => (<i className="fa-solid fa-star"></i>))}
                                                        </span>
                                                }
                                                {/* {[...Array(Math.floor(product.avgRating))].map(star => <i className="fa-sharp fa-solid fa-star"></i>)} */}
                                                &nbsp;({product.numReviews})
                                            </span>
                                        </div>
                                    </>
                                    }
                                    <div className='search-product-price'>${parseFloat(product?.price).toFixed(2)}</div>
                                </NavLink>
                                <div className='search-product-shop'>{sessionUser?.username}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchProducts
