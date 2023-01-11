import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchImg } from "../../store/product";


const UploadPicture = (productId) => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = document.getElementById('form')
        const formData = new FormData(form);
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        // console.log(image.name, "image?????")
        const res = await fetch(`/api/products/${productId.productId}/images`, {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/account");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        // console.log(file, "FILES IN FRONTEND???")
        setImage(file);
    }

    return (
        <div className='createproduct-wrapper'>
            <div className="header-wrapper">
                <h1 className='createproduct-form-title'>Create a product</h1>
                <p>Add photos about your product. You will not be able to edit your images once you submit! </p>
            </div>
            {/* <div className='img-product-errors'>
                <ul>
                    {errors && errors.map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            </div> */}
            <div className="createproduct-form">
                <div className='createproduct-content'>
                    <h3>Photos</h3>
                    <p className="paragraph">Add as many photos as you can so buyers can see every detail.</p>
                    <form id="form" className="createproduct-label" onSubmit={handleSubmit}>
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
                                <input className="addImage-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={updateImage}
                                />
                                <button type="submit">Submit</button>
                                {(imageLoading) && <p>Loading...</p>}
                            </label>

                        </div>
                        {/* <div className="right-side-image-create">
                            <label> Image 2 (required)
                                <br></br>
                                <input className="addImage-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={updateImage}
                                />
                                <button type="submit">Submit</button>
                                {(imageLoading) && <p>Loading...</p>}
                            </label>

                        </div> */}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default UploadPicture;
