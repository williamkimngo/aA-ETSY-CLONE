import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchAllProducts } from "../../store/product"
import './accountProfile.css'
import UserProducts from "./UserProducts"

const AccountProfile = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const ObjProducts = useSelector(state => state.products.allProducts)
    const productsArr = Object.values(ObjProducts)

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, dispatch)

    if (!sessionUser) {
        return <Redirect to="/" />
    }
    return (
        <div className="my-products-main">
            <div className="my-products-upper">
                <div className="my-products-header">Account Page</div>
                {sessionUser?.username &&
                    <div className="my-products-shop">
                        <span className="shop-manager-shop-name">{sessionUser?.username}</span>
                        &nbsp;
                        <i className="fa-solid fa-angle-right"></i>
                    </div>
                }
            </div>

            <div className="my-products-outer">
                <div className="my-products-inner">
                    {
                        productsArr.map((product) => (
                            <UserProducts key={product.id} product={product} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default AccountProfile
