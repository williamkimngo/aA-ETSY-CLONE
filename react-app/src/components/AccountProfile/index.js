import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchUserProducts } from "../../store/product"
import './accountProfile.css'
import UserProducts from "./UserProducts"

const AccountProfile = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const ObjProducts = useSelector(state => state.products.allProducts)
    const productsArr = Object.values(ObjProducts)

    useEffect(() => {
        dispatch(fetchUserProducts())
    }, [dispatch])

    if (!sessionUser) {
        return <Redirect to="/" />
    }
    if(!productsArr.length) {
        return null
    }
    return (
        <div className="userproducts-container">
            <div className="userproducts-upper">
                <div className="userproducts-header">Account Page</div>
                {sessionUser?.username &&
                    <div className="userproducts-products">
                        <span className="shop-manager-shop-name">{sessionUser?.username}</span>
                        &nbsp;
                        <i className="fa-solid fa-angle-right"></i>
                    </div>
                }
            </div>

            <div className="userproducts-outer">
                <div className="userproducts-inner">
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
