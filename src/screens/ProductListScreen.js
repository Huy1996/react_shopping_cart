import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { createProduct, deleteProduct, listProducts } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstant';
import { useNavigate } from 'react-router-dom';

export default function ProductListScreen(props) {
    const navigate = useNavigate();
    const {pageNumber=1} = useParams();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productCreate = useSelector(state => state.productCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;
    
    const productDelete =useSelector(state => state.productDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successCreate){
            dispatch({
                type: PRODUCT_CREATE_RESET,
            });
            navigate(`/product/${createdProduct._id}/edit`);
        }
        if(successDelete){
            dispatch({
                type: PRODUCT_DELETE_RESET,
            })
        }
        dispatch(listProducts({pageNumber}));
    }, [dispatch, successCreate, navigate, createdProduct, successDelete, pageNumber] );


    const deleteHandler = (product) =>{
        // todo: dispatch delete action
        if(window.confirm('Are you sure to delele?')){
            dispatch(deleteProduct(product._id));
        }
    }

    const createHandler = () => {
        dispatch(createProduct())
    }

    return (
        <div>
            <div className='row'>
                <h1>Product</h1>
                <button type="button" className='primary' onClick={createHandler}>
                    Create Product
                </button>
            </div>             
            {loadingDelete && (<LoadingBox />)}
            {errorDelete && (<MessageBox variant="danger">{errorDelete}</MessageBox>)}     
            {loadingCreate && (<LoadingBox />)}
            {errorCreate && (<MessageBox variant="danger">{errorCreate}</MessageBox>)}         
            {loading ? (<LoadingBox />) :
            error ? (<MessageBox variant="danger">{error}</MessageBox>) :
            (
                <>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button 
                                        type='button' 
                                        className='small' 
                                        onClick={() => navigate(`/product/${product._id}/edit`)}
                                    >
                                        <i className="fa fa-edit" />
                                    </button>
                                    <button
                                        type='button'
                                        className='small'
                                        onClick={() => deleteHandler(product)}
                                    >
                                        <i className="fa fa-trash" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='row center pagination'>
                    {
                        [...Array(pages).keys()].map(x => (
                            <Link className={x+1 === page ? 'active' : ''} key={x+1} to={`/productlist/pageNumber/${x+1}`}>{x+1}</Link>
                        ))
                    }
                </div>
                </>
            )}
        </div>
    )
}
