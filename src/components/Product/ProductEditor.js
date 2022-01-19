import React, {useState}        from 'react';
import LoadingBox               from "../Loading/LoadingBox";
import MessageBox               from "../Support/MessageBox";
import {useSelector}            from "react-redux";
import Axios                    from "axios";
import ClassicEditor            from '@ckeditor/ckeditor5-build-classic';
import { CKEditor }             from '@ckeditor/ckeditor5-react'

function ProductEditor(props) {

    //
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    //
    const productCategoryList = useSelector(state => state.productCategoryList);
    const {categories} = productCategoryList;

    const productBrandList = useSelector(state => state.productBrandList);
    const {brands} = productBrandList;

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormDate = new FormData();
        bodyFormDate.append('image', file);
        setLoadingUpload(true);
        try{
            const {data} = await Axios.post('/api/uploads/s3', bodyFormDate, {
                headers: {
                    'Content-Type': 'muttipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            props.setImage(data);
            setLoadingUpload(false);
        }
        catch(error){
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }

    const editorHandler = (event, editor) => {
        const data = editor.getData();
        props.setDescription(data);
    }

    return (
        <div>
            <form className='form' onSubmit={props.submitHandler}>
                <div>
                    <h1>{props.title}</h1>
                </div>
                {props.loading ? (<LoadingBox />) :
                    props.error ? (<MessageBox variant="danger">{props.error}</MessageBox>):
                        (
                            <>
                                <div>
                                    <label htmlFor='name'>Name</label>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder="Enter name"
                                        value={props.name}
                                        onChange={(e) => props.setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='price'>Price</label>
                                    <input
                                        id='price'
                                        type='text'
                                        placeholder="Enter price"
                                        value={props.price}
                                        onChange={(e) => props.setPrice(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='image'>Image</label>
                                    <input
                                        id='image'
                                        type='text'
                                        placeholder="Enter image"
                                        value={props.image}
                                        readOnly={true}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='imageFile'>Image File</label>
                                    <input
                                        type='file'
                                        id='imageFile'
                                        label="Choose Image"
                                        onChange={uploadFileHandler}
                                    />
                                    {loadingUpload && (<LoadingBox />)}
                                    {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
                                </div>
                                <div>
                                    <label htmlFor='category'>Category</label>
                                    <input
                                        id='category'
                                        list='categories'
                                        type='text'
                                        placeholder="Enter category"
                                        value={props.category}
                                        onChange={(e) => props.setCategory(e.target.value)}
                                    />
                                    <datalist id='categories'>
                                        {
                                            categories.map((c) => (
                                                <option value={c} />
                                            ))
                                        }
                                    </datalist>
                                </div>
                                <div>
                                    <label htmlFor='brand'>Brand</label>
                                    <input
                                        id='brand'
                                        list='brands'
                                        type='text'
                                        placeholder="Enter brand"
                                        value={props.brand}
                                        onChange={(e) => props.setBrand(e.target.value)}
                                    />
                                    <datalist id='brands'>
                                        {
                                            brands.map((b) => (
                                                <option value={b} />
                                            ))
                                        }
                                    </datalist>
                                </div>
                                <div>
                                    <label htmlFor='countInStock'>Count In Stock</label>
                                    <input
                                        id='countInStock'
                                        type='text'
                                        placeholder="Enter Count In Stock"
                                        value={props.countInStock}
                                        onChange={(e) => props.setCountInStock(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='description'>Description</label>
                                    {/*
                                     <textarea
                                        id='nadescriptionme'
                                        type='text'
                                        placeholder="Enter description"
                                        value={props.description}
                                        onChange={(e) => props.setDescription(e.target.value)}
                                    />
                                     */}
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={props.description}
                                        onChange={editorHandler}
                                    />

                                </div>
                                <div>
                                    <label></label>
                                    <button className='primary' type='submit'>
                                        Update
                                    </button>
                                </div>
                            </>
                        )}
            </form>
        </div>
    );
}

export default ProductEditor;