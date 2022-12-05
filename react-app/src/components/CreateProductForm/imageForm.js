import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchImg } from "../../store/product";
import './createProductForm.css'

const ImgCreate = (productId) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [img1, setimg1] = useState()
    const [img2, setimg2] = useState()
    const [img3, setimg3] = useState()
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = []
        if (!img1 || !img1?.includes('https://')) errors.push("Please provide one image with 'https://'")

        if (img2 && !img2?.includes('https://')) {
            errors.push("Please provide a vaild image-2 with 'https://'")
        }
        if ((img3 && !img3?.includes('https://'))) {
            errors.push("Please provide a vaild image-3 with 'https://'")
        }
        setErrors(errors)
    }, [img1, img2, img3])

    const submitImage = async (e) => {
        e.preventDefault()
        if (errors.length > 0) {
            return
        }
        const productIdImg = productId.productId

        if (img1) {
            await dispatch(fetchImg(img1, productIdImg))
        }
        if (img2) {
            await dispatch(fetchImg(img2, productIdImg))
        }
        if (img3) {
            await dispatch(fetchImg(img3, productIdImg))
        }

        history.push('/account')
    }
    return (
        <div className='createproduct-wrapper'>
            <div className="header-wrapper">
                <h1 className='createproduct-form-title'>Create a product</h1>
                <p>Add photos about your product. You will not be able to edit your images once you submit! </p>
            </div>
            <div className='img-product-errors'>
                <ul>
                    {errors && errors.map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            </div>
            <div className="createproduct-form">
                <div className='createproduct-content'>
                    <h3>Photos</h3>
                    <p className="paragraph">Add as many photos as you can so buyers can see every detail.</p>
                    <form className='createproduct-label'>
                        <div className="left-side-create">
                            <span className="createproduct-title">Photos* </span>
                            <span className="createproduct-sub-title">Use up to three photos to show your item's most important qualities.</span>
                            <ul className="createImg-sub-title"><span>Tips:</span>
                                <li>Use natural light and no flash.</li>
                                <li>Include a common object for scale.</li>
                                <li>Show the item being held, worn, or used.</li>
                                <li>Shoot against a clean, simple background.</li>
                                <li>Add photos to your variations so buyers can see all their options.</li>
                            </ul>
                        </div>
                        <div className="right-side-image-create">
                        <label> Image 1 (required)
                            <br></br>
                            <input className='addImage-input'
                                type="text"
                                value={img1}
                                required
                                onChange={(e) => setimg1(e.target.value)}
                            />

                        </label>

                        <br></br>
                        <label>Image 2 (optional)
                            <br></br>
                            <input className='addImage-input'
                                type="text"
                                value={img2}
                                onChange={(e) => setimg2(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label>Image 3 (optional)
                            <br></br>
                            <input className='addImage-input'
                                type="text"
                                value={img3}
                                onChange={(e) => setimg3(e.target.value)}
                            />
                        </label>
                        </div>
                    </form>
                    <button className="imgproduct-button" onClick={submitImage}>Submit</button>
                </div>
            </div>
        </div>
    )
}
export default ImgCreate
