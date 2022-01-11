import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../node_modules/axios/index';
import { detailsProduct, updateProduct } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductEditScreen(props) {
    const params = useParams();
    const navigate = useNavigate();
    const {id : productId }= params;
    const [name, setName]                   = useState('');
    const [price, setPrice]                 = useState('');
    const [image, setImage]                 = useState('');
    const [category, setCategory]           = useState('');
    const [countInStock, setCountInStock]   = useState('');
    const [brand, setBrand]                 = useState('');
    const [description, setDescription]     = useState('');
    
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const productCategoryList = useSelector(state => state.productCategoryList);
    const {categories} = productCategoryList;

    const productBrandList = useSelector(state => state.productBrandList);
    const {brands} = productBrandList;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
            navigate('/productlist/pageNumber/1');
        }
        if(!product || (product._id !== productId) || successUpdate){
            dispatch({
                type: PRODUCT_UPDATE_RESET,
            })
            dispatch(detailsProduct(productId));
        }
        else{
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        }
    }, [product, dispatch, productId, successUpdate, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            category,
            brand,
            countInStock,
            description
        }))
    }

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
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
            setImage(data);
            setLoadingUpload(false);
        }
        catch(error){
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && (<LoadingBox />)}
                {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                {loading ? (<LoadingBox />) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>):
                (
                    <>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input 
                                id='name' 
                                type='text' 
                                placeholder="Enter name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}                                 
                            />
                        </div>
                        <div>
                            <label htmlFor='price'>Price</label>
                            <input 
                                id='price' 
                                type='text' 
                                placeholder="Enter price" 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)}                                 
                            />
                        </div>
                        <div>
                            <label htmlFor='image'>Image</label>
                            <input 
                                id='image' 
                                type='text' 
                                placeholder="Enter image" 
                                value={image}
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
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}                                 
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
                                value={brand} 
                                onChange={(e) => setBrand(e.target.value)}                                 
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
                                value={countInStock} 
                                onChange={(e) => setCountInStock(e.target.value)}                                 
                            />
                        </div>
                        <div>
                            <label htmlFor='description'>Description</label>
                            <textarea 
                                id='nadescriptionme' 
                                type='text' 
                                placeholder="Enter description" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}                                 
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
    )
}
