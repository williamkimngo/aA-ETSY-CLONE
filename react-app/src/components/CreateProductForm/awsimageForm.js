import React, {useState} from "react";
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
        <form id="form" onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default UploadPicture;
