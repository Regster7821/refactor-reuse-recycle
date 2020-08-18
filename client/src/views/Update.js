import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import ProductForm from '../components/ProductForm';
import DeleteButton from '../components/DeleteButton';

export default props => {
    const { id } = props;
    const [product, setProduct] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8000/api/products/' + id)
            .then(res => {
                setProduct(res.data);
                setLoaded(true);
            })
    }, [])
    const updateProduct = product => {
        axios.put('http://localhost:8000/api/products/' + id + '/edit', product)
            .then(res => console.log(res));
    }
    return (
        <div>
            <h1>Update a Product</h1>
            {loaded && (
                <ProductForm
                    onSubmitProp={updateProduct}
                    initialTitle={product.title}
                    initialPrice={product.price}
                    initialDescription={product.description}
                />
            )}
            <br/>
            <DeleteButton productId={product._id} successCallback={() => navigate("/")} /><br/><br/>
            <button><Link to={ '/products' }>Home</Link></button>
        </div>
    )
}
